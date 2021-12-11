using backend.Api.Gallery.Type;
using backend.Core.Client.Flickr;
using backend.Core.Client.Flickr.Type;
using backend.Core.Type;
using Microsoft.Extensions.Options;

namespace backend.Api.Gallery;

public interface IAdminAlbumService
{
    Result<GetAlbumResponse> GetAdminAlbumByType(AdminAlbumType type);
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

        var getPhotosFromPhotosetResult = _flickrClient.GetPhotoset(photosetId);
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
}