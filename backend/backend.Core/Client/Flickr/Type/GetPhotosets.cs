namespace backend.Core.Client.Flickr.Type;

public sealed class GetPhotosetsResponse
{
    public int PageSize { get; init; }
    public int Total { get; init; }
    public List<Photoset> Photosets { get; init; }

    public sealed class Photoset
    {
        public string Id { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public DateTime CreatedAt { get; init; }
        public int PhotoCount { get; init; }
        public PrimaryPhoto PrimaryPhoto { get; init; }
    }

    public sealed class PrimaryPhoto
    {
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public string ImageUrlSmall { get; init; }
    }
}