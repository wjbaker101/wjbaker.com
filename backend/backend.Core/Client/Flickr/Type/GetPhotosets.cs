using Newtonsoft.Json;

namespace backend.Core.Client.Flickr.Type;

public sealed class GetPhotosetsResponse
{
    public RootPhotosets Photosets { get; set; }

    public sealed class RootPhotosets
    {
        public int Page { get; init; }
        public int Pages { get; init; }
        public int PerPage { get; init; }
        public int Total { get; init; }
        public List<Photoset> Photoset { get; init; }
    }

    public sealed class Photoset
    {
        public string Id { get; init; }
        public StringValue Title { get; init; }
        public StringValue Description { get; init; }
        public long DateCreate { get; init; }
        public int Photos { get; init; }
    }

    public sealed class StringValue
    {
        [JsonProperty("_content")]
        public string Content { get; init; }
    }
}