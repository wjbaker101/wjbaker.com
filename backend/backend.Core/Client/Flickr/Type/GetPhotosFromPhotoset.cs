namespace backend.Core.Client.Flickr.Type;

public sealed class GetPhotosFromPhotoset
{
    public string Id { get; init; }
    public int Total { get; init; }
    public int PerPage { get; init; }
    public string Title { get; init; }
    public List<Photo> Photos { get; init; }

    public sealed class Photo
    {
        public string Id { get; init; }
        public string Title { get; init; }
        public DateTime TakenAt { get; init; }
        public double Latitude { get; init; }
        public double Longitude { get; init; }
    }
}