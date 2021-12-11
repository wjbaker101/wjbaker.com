using backend.Core.Client.Flickr.Type;
using backend.Core.Extension;
using backend.Core.Type;
using FlickrNet;
using Microsoft.Extensions.Options;

namespace backend.Core.Client.Flickr;

public interface IFlickrClient
{
    Result<GetPhotosetsResponse> GetPhotosets();
    Result<GetPhotosFromPhotoset> GetPhotoset(string photosetId);
    Result<UploadPhotoResponse> UploadImage(UploadPhotoRequest request);
    Result AddPhotoToPhotoset(AddPhotoToPhotosetRequest request);
}

public sealed class FlickrClient : IFlickrClient
{
    private readonly FlickrNet.Flickr _flickr;

    public FlickrClient(IOptions<FlickrSettings> flickrSettings)
    {
        _flickr = new FlickrNet.Flickr(flickrSettings.Value.ApiKey, flickrSettings.Value.ApiSecret)
        {
            OAuthAccessToken = flickrSettings.Value.Token,
            OAuthAccessTokenSecret = flickrSettings.Value.TokenSecret
        };
    }

    public Result<GetPhotosetsResponse> GetPhotosets()
    {
        var photosets = _flickr.PhotosetsGetList();

        return Result<GetPhotosetsResponse>.Of(new GetPhotosetsResponse
        {
            Total = photosets.Total,
            PageSize = photosets.PerPage,
            Photosets = photosets.ConvertAll(x => new GetPhotosetsResponse.Photoset
            {
                Id = x.PhotosetId,
                Title = x.Title,
                Description = x.Description,
                CreatedAt = x.DateCreated,
                PhotoCount = x.NumberOfPhotos,
                PrimaryPhoto = new GetPhotosetsResponse.PrimaryPhoto
                {
                    Latitude = x.PrimaryPhoto.Latitude,
                    Longitude = x.PrimaryPhoto.Longitude,
                    ImageUrlSmall = x.PrimaryPhoto.SmallUrl
                }
            })
        });
    }

    public Result<GetPhotosFromPhotoset> GetPhotoset(string photosetId)
    {
        var photoset = _flickr.PhotosetsGetPhotos(photosetId, PhotoSearchExtras.All, PrivacyFilter.None, 1, 50);

        return Result<GetPhotosFromPhotoset>.Of(new GetPhotosFromPhotoset
        {
            Id = photoset.PhotosetId,
            Title = photoset.Title,
            Total = photoset.Total,
            PerPage = photoset.PerPage,
            Photos = photoset.ConvertAll(x => new GetPhotosFromPhotoset.Photo
            {
                Id = x.PhotoId,
                Title = x.Title,
                TakenAt = x.DateTaken,
                Latitude = x.Latitude,
                Longitude = x.Longitude
            })
        });
    }

    public Result<UploadPhotoResponse> UploadImage(UploadPhotoRequest request)
    {
        var tags = request.Tags == null ? "" : string.Join(' ', request.Tags);

        var photoId = _flickr.UploadPicture(request.Photo, Guid.NewGuid().ToString(), request.Title, request.Description, tags, request.IsPublic, false, false, ContentType.Photo, SafetyLevel.None, HiddenFromSearch.Hidden);

        var photo = _flickr.PhotosGetInfo(photoId);

        return Result<UploadPhotoResponse>.Of(new UploadPhotoResponse
        {
            Id = photo.PhotoId,
            Title = photo.Title,
            Latitude = photo.Location?.Latitude,
            Longitude = photo.Location?.Longitude,
            TakenAt = photo.DateTaken,
            ImageUrlLarge = photo.LargeUrl
        });
    }

    public Result AddPhotoToPhotoset(AddPhotoToPhotosetRequest request)
    {
        _flickr.PhotosetsAddPhoto(request.PhotosetId, request.PhotoId);

        return Result.Success();
    }
}