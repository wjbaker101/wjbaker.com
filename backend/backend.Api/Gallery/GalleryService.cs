using backend.Api.Gallery.Type;
using backend.Core.Client.Flickr;
using backend.Core.Type;

namespace backend.Api.Gallery;

public interface IGalleryService
{
    Result<GetAlbumsResponse> GetAlbums();
    Result<GetPhotosByAlbum> GetPhotosByAlbum(string albumId);
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
        var getPhotosFromPhotosetResult = _flickrClient.GetPhotosFromPhotoset(USER_ID, albumId);
        if (getPhotosFromPhotosetResult.IsFailure)
            return Result<GetPhotosByAlbum>.From(getPhotosFromPhotosetResult);

        var result = getPhotosFromPhotosetResult.Value.Photoset;

        return Result<GetPhotosByAlbum>.Of(new GetPhotosByAlbum
        {
            Total = result.Total,
            PageSize = result.PerPage,
            Photos = result.Photo.ConvertAll(x => new GetPhotosByAlbum.Photo
            {
                Id = x.Id,
                Title = x.Title,
                TakenAt = DateTime.Parse(x.DateTaken),
                Latitude = x.Latitude,
                Longitude = x.Longitude
            })
        });
    }
}