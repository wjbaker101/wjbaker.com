using backend.Api.Gallery.Type;
using backend.Core.Client.Flickr;
using backend.Core.Client.Flickr.Type;
using backend.Core.Extension;
using backend.Core.Type;
using Microsoft.Extensions.Options;
using UploadPhotoRequest = backend.Api.Gallery.Type.UploadPhotoRequest;
using UploadPhotoResponse = backend.Api.Gallery.Type.UploadPhotoResponse;

namespace backend.Api.Gallery;

public interface IGalleryService
{
    Result<GetAlbumsResponse> GetAlbums();
    Result<GetAlbumResponse> GetAlbumById(string albumId);
    Result<UploadPhotoResponse> UploadPhoto(UploadPhotoRequest request);
}

public sealed class GalleryService : IGalleryService
{
    private readonly IFlickrClient _flickrClient;
    private readonly HashSet<string> _adminAlbumIds;

    public GalleryService(IFlickrClient flickrClient, IOptions<FlickrSettings> flickrSettings)
    {
        _flickrClient = flickrClient;
        _adminAlbumIds = flickrSettings.Value.AdminAlbums.Values.ToHashSet();
    }

    public Result<GetAlbumsResponse> GetAlbums()
    {
        var getPhotosetsResult = _flickrClient.GetPhotosets();
        if (getPhotosetsResult.IsFailure)
            return Result<GetAlbumsResponse>.From(getPhotosetsResult);

        var result = getPhotosetsResult.Value;

        return Result<GetAlbumsResponse>.Of(new GetAlbumsResponse
        {
            Total = result.Total - _adminAlbumIds.Count,
            PageSize = result.PageSize,
            Albums = result.Photosets
                .Where(x => !_adminAlbumIds.Contains(x.Id))
                .ConvertAll(x => new GetAlbumsResponse.Album
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    CreatedAt = x.CreatedAt,
                    PhotoCount = x.PhotoCount,
                    CoverPhoto = new GetAlbumsResponse.CoverPhoto
                    {
                        Latitude = x.PrimaryPhoto.Latitude,
                        Longitude = x.PrimaryPhoto.Longitude,
                        ImageUrl = x.PrimaryPhoto.ImageUrlSmall
                    }
                })
        });
    }

    public Result<GetAlbumResponse> GetAlbumById(string albumId)
    {
        var getPhotosFromPhotosetResult = _flickrClient.GetPhotoset(albumId);
        if (getPhotosFromPhotosetResult.IsFailure)
            return Result<GetAlbumResponse>.From(getPhotosFromPhotosetResult);

        var result = getPhotosFromPhotosetResult.Value;

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

    public Result<UploadPhotoResponse> UploadPhoto(UploadPhotoRequest request)
    {
        using var photoStream = request.Photo.OpenReadStream();

        var uploadImageResult = _flickrClient.UploadImage(new Core.Client.Flickr.Type.UploadPhotoRequest
        {
            Title = request.Title,
            Description = request.Description,
            Tags = string.IsNullOrWhiteSpace(request.Tags) ? null : request.Tags.Split(',').ToList(),
            Photo = photoStream,
            IsPublic = request.IsPublic
        });
        if (uploadImageResult.IsFailure)
            return Result<UploadPhotoResponse>.From(uploadImageResult);

        var photo = uploadImageResult.Value;

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