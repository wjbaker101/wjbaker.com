﻿using backend.Api.AdminAlbum.Type;
using backend.Api.Gallery.Type;
using backend.Core;
using backend.Core.Client.Flickr;
using backend.Core.Client.Flickr.Type;
using backend.Core.Type;
using UploadPhotoResponse = backend.Api.Gallery.Type.UploadPhotoResponse;

namespace backend.Api.AdminAlbum;

public interface IAdminAlbumService
{
    Result<GetAlbumResponse> GetAdminAlbumByType(AdminAlbumType type);
    Result<UploadPhotoResponse> UploadImageToAdminAlbum(UploadImageToAdminAlbumRequest request, AdminAlbumType type);
}

public sealed class AdminAlbumService : IAdminAlbumService
{
    private readonly IFlickrClient _flickrClient;
    private readonly Dictionary<string, string> _adminAlbumMappings;

    public AdminAlbumService(IFlickrClient flickrClient, ApiSecretSettings apiSecretSettings)
    {
        _flickrClient = flickrClient;
        _adminAlbumMappings = apiSecretSettings.Flickr.AdminAlbums;
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

    public Result<UploadPhotoResponse> UploadImageToAdminAlbum(UploadImageToAdminAlbumRequest request, AdminAlbumType type)
    {
        if (!_adminAlbumMappings.TryGetValue(type.ToString(), out var photosetId))
            return Result<UploadPhotoResponse>.Failure($"The given admin album type is not supported: {type}.");

        Result<Core.Client.Flickr.Type.UploadPhotoResponse> uploadImageResult;
        using (var imageStream = request.Image.OpenReadStream())
        {
            uploadImageResult = _flickrClient.UploadImage(new Core.Client.Flickr.Type.UploadPhotoRequest
            {
                Title = Guid.NewGuid().ToString(),
                Description = "",
                Tags = new List<string>(),
                Photo = imageStream,
                IsPublic = false
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