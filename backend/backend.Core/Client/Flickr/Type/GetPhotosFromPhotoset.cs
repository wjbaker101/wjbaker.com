using Newtonsoft.Json;

namespace backend.Core.Client.Flickr.Type;

public sealed class GetPhotosFromPhotoset
{
    public RootPhotoset Photoset { get; init; }

    public sealed class RootPhotoset
    {
        public string Id { get; init; }
        public List<Photo> Photo { get; init; }
    }

    public sealed class Photo
    {
        public string Id { get; init; }
        public string Title { get; init; }

        [JsonProperty("datetaken")]
        public string DateTaken { get; init; }

        public double Latitude { get; init; }
        public double Longitude { get; init; }
    }
}