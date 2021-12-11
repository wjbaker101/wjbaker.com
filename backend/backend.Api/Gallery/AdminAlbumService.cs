using backend.Api.Gallery.Type;
using backend.Core.Client.Flickr;
using backend.Core.Client.Flickr.Type;
using backend.Core.Type;
using Microsoft.Extensions.Options;
using UploadPhotoRequest = backend.Api.Gallery.Type.UploadPhotoRequest;
using UploadPhotoResponse = backend.Api.Gallery.Type.UploadPhotoResponse;

namespace backend.Api.Gallery;

public interface IAdminAlbumService
{
    Result<GetAlbumResponse> GetAdminAlbumByType(AdminAlbumType type);
    Result<UploadPhotoResponse> UploadImageToAdminAlbum(UploadPhotoRequest request, AdminAlbumType type);
}

public sealed class AdminAlbumService : IAdminAlbumService
{
    private readonly IFlickrClient _flickrClient;
    private readonly Dictionary<string, string> _adminAlbumMappings;

    public AdminAlbumService(IFlickrClient flickrClient, IOptions<FlickrSettings> flickrSettings)
    {
        _flickrClient = flickrClient;
        _adminAlbumMappings = flickrSettings.Value.AdminAlbums;
    }

    public Result<GetAlbumResponse> GetAdminAlbumByType(AdminAlbumType type)
    {
        if (!_adminAlbumMappings.TryGetValue(type.ToString(), out var photosetId))
            return Result<GetAlbumResponse>.Failure($"The given admin album type is not supported: {type}.");

        var getPhotosetResult = _flickrClient.GetPhotoset(photosetId);
        if (getPhotosetResult.IsFailure)
            return Result<GetAlbumResponse>.From(getPhotosetResult);

        var result = getPhotosetResult.Value;

        return Result<GetAlbumResponse>.Of(new GetAlbumResponse
        {
            Id = result.Id,
            Total = result.Total,
            PageSize = result.PerPage,
            Title = result.Title,
            Photos = result.Photos.ConvertAll(x => new GetAlbumResponse.Photo
            {
                Id = x.Id,
                Title = x.Title,
                TakenAt = x.TakenAt,
                Latitude = x.Latitude,
                Longitude = x.Longitude
            })
        });
    }

    public Result<UploadPhotoResponse> UploadImageToAdminAlbum(UploadPhotoRequest request, AdminAlbumType type)
    {
        if (!_adminAlbumMappings.TryGetValue(type.ToString(), out var photosetId))
            return Result<UploadPhotoResponse>.Failure($"The given admin album type is not supported: {type}.");

        Result<Core.Client.Flickr.Type.UploadPhotoResponse> uploadImageResult;
        using (var photoStream = request.Photo.OpenReadStream())
        {
            uploadImageResult = _flickrClient.UploadImage(new Core.Client.Flickr.Type.UploadPhotoRequest
            {
                Title = request.Title,
                Description = request.Description,
                Tags = string.IsNullOrWhiteSpace(request.Tags) ? null : request.Tags.Split(',').ToList(),
                Photo = photoStream,
                IsPublic = request.IsPublic
            });
            if (uploadImageResult.IsFailure)
                return Result<UploadPhotoResponse>.From(uploadImageResult);
        }

        var photo = uploadImageResult.Value;

        var addPhotoToPhotosetResult = _flickrClient.AddPhotoToPhotoset(new AddPhotoToPhotosetRequest
        {
            PhotoId = photo.Id,
            PhotosetId = photosetId
        });
        if (addPhotoToPhotosetResult.IsFailure)
            return Result<UploadPhotoResponse>.Failure(addPhotoToPhotosetResult.FailureMessage!);

        return Result<UploadPhotoResponse>.Of(new UploadPhotoResponse
        {
            Id = photo.Id,
            Title = photo.Title,
            Latitude = photo.Latitude,
            Longitude = photo.Longitude,
            TakenAt = photo.TakenAt,
            ImageUrlLarge = photo.ImageUrlLarge
        });
    }
}