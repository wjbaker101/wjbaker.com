namespace backend.Core.Client.Flickr.Type;

public sealed class FlickrSettings
{
    public string ApiKey { get; init; }
    public string ApiSecret { get; init; }
    public string Token { get; init; }
    public string TokenSecret { get; init; }
}