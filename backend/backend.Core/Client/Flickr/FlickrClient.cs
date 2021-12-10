using backend.Core.Client.Flickr.Type;
using backend.Core.Type;
using FlickrNet;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace backend.Core.Client.Flickr;

public interface IFlickrClient
{
    Result<GetPhotosetsResponse> GetPhotosets(string userId);
    Result<GetPhotosFromPhotoset> GetPhotosFromPhotoset(string userId, string photosetId);
    Result<UploadPhotoResponse> UploadImage(UploadPhotoRequest request);
}

public sealed class FlickrClient : IFlickrClient
{
    private const string API_KEY = "e7a0e27fd6e5e81152f7f77efaadee8f";

    private static readonly HttpClient Client;

    private readonly FlickrNet.Flickr _flickr;

    static FlickrClient()
    {
        Client = new HttpClient
        {
            BaseAddress = new Uri("https://api.flickr.com/services/rest"),
            Timeout = TimeSpan.FromSeconds(10)
        };
    }

    public FlickrClient(IOptions<FlickrSettings> flickrSettings)
    {
        _flickr = new FlickrNet.Flickr(flickrSettings.Value.ApiKey, flickrSettings.Value.ApiSecret)
        {
            OAuthAccessToken = flickrSettings.Value.Token,
            OAuthAccessTokenSecret = flickrSettings.Value.TokenSecret
        };
    }

    private static Result<T> Get<T>(string method, Dictionary<string, string>? additionalParameters = null)
    {
        var parameters = additionalParameters ?? new Dictionary<string, string>();

        parameters.Add("api_key", API_KEY);
        parameters.Add("method", method);
        parameters.Add("format", "json");
        parameters.Add("nojsoncallback", "1");

        var url = QueryHelpers.AddQueryString(Client.BaseAddress!.AbsoluteUri, parameters);

        var response = Client.GetStringAsync(url).Result;

        return Result<T>.Of(JsonConvert.DeserializeObject<T>(response, new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver { NamingStrategy = new SnakeCaseNamingStrategy() }
        }));
    }

    public Result<GetPhotosetsResponse> GetPhotosets(string userId)
    {
        return Get<GetPhotosetsResponse>("flickr.photosets.getList", new Dictionary<string, string>
        {
            ["user_id"] = userId,
            ["primary_photo_extras"] = "geo, url_s"
        });
    }

    public Result<GetPhotosFromPhotoset> GetPhotosFromPhotoset(string userId, string photosetId)
    {
        return Get<GetPhotosFromPhotoset>("flickr.photosets.getPhotos", new Dictionary<string, string>
        {
            ["user_id"] = userId,
            ["photoset_id"] = photosetId,
            ["extras"] = "date_taken, geo"
        });
    }

    public Result<UploadPhotoResponse> UploadImage(UploadPhotoRequest request)
    {
        var tags = request.Tags == null ? "" : string.Join(' ', request.Tags);

        var photoId = _flickr.UploadPicture(request.Photo, Guid.NewGuid().ToString(), request.Title, request.Description, tags, true, false, false, ContentType.Photo, SafetyLevel.None, HiddenFromSearch.Hidden);

        var photo = _flickr.PhotosGetInfo(photoId);

        return Result<UploadPhotoResponse>.Of(new UploadPhotoResponse
        {
            Id = photo.PhotoId,
            Title = photo.Title,
            Latitude = photo.Location.Latitude,
            Longitude = photo.Location.Longitude,
            TakenAt = photo.DateTaken
        });
    }
}