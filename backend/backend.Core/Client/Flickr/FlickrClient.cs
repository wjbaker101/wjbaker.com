using backend.Core.Client.Flickr.Type;
using backend.Core.Type;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace backend.Core.Client.Flickr;

public interface IFlickrClient
{
    Result<GetPhotosetsResponse> GetPhotosets(string userId);
    Result<GetPhotosFromPhotoset> GetPhotosFromPhotoset(string userId, string photosetId);
}

public sealed class FlickrClient : IFlickrClient
{
    private const string API_KEY = "e7a0e27fd6e5e81152f7f77efaadee8f";

    private static readonly HttpClient Client;

    static FlickrClient()
    {
        Client = new HttpClient
        {
            BaseAddress = new Uri("https://api.flickr.com/services/rest"),
            Timeout = TimeSpan.FromSeconds(10)
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
}