using backend.Api.Gallery.Type;
using backend.Core.Client.Flickr;
using backend.Core.Type;

namespace backend.Api.Gallery;

public interface IGalleryService
{
    Result<GetAlbumsResponse> GetAlbums();
    Result<GetPhotosByAlbum> GetPhotosByAlbum(string albumId);
    Result<UploadPhotoResponse> UploadPhoto(UploadPhotoRequest request);
}

public sealed class GalleryService : IGalleryService
{
    private const string USER_ID = "189343469@N08";

    private readonly IFlickrClient _flickrClient;

    public GalleryService(IFlickrClient flickrClient)
    {
        _flickrClient = flickrClient;
    }

    public Result<GetAlbumsResponse> GetAlbums()
    {
        var getPhotosetsResult = _flickrClient.GetPhotosets(USER_ID);
        if (getPhotosetsResult.IsFailure)
            return Result<GetAlbumsResponse>.From(getPhotosetsResult);

        var result = getPhotosetsResult.Value.Photosets;

        return Result<GetAlbumsResponse>.Of(new GetAlbumsResponse
        {
            Total = result.Total,
            PageSize = result.PerPage,
            Albums = result.Photoset.ConvertAll(x => new GetAlbumsResponse.Album
            {
                Id = x.Id,
                Title = x.Title.Content,
                Description = x.Description.Content,
                CreatedAt = DateTimeOffset.FromUnixTimeSeconds(x.DateCreate).DateTime,
                PhotoCount = x.Photos,
                CoverPhoto = new GetAlbumsResponse.CoverPhoto
                {
                    Latitude = x.PrimaryPhotoExtras.Latitude,
                    Longitude = x.PrimaryPhotoExtras.Longitude,
                    ImageUrl = x.PrimaryPhotoExtras.UrlS
                }
            })
        });
    }

    public Result<GetPhotosByAlbum> GetPhotosByAlbum(string albumId)
    {
        var getPhotosFromPhotosetResult = _flickrClient.GetPhotoset(albumId);
        if (getPhotosFromPhotosetResult.IsFailure)
            return Result<GetPhotosByAlbum>.From(getPhotosFromPhotosetResult);

        var result = getPhotosFromPhotosetResult.Value;

        return Result<GetPhotosByAlbum>.Of(new GetPhotosByAlbum
        {
            Total = result.Total,
            PageSize = result.PerPage,
            Photos = result.Photos.ConvertAll(x => new GetPhotosByAlbum.Photo
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
            Photo = photoStream
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
            TakenAt = photo.TakenAt
        });
    }
}