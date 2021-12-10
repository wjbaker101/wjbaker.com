namespace backend.Core.Client.Flickr.Type;

public sealed class UploadPhotoRequest
{
    public string Title { get; init; }
    public string Description { get; init; }
    public List<string>? Tags { get; init; }
    public Stream Photo { get; init; }
}

public sealed class UploadPhotoResponse
{
    public string Id { get; init; }
    public string Title { get; init; }
    public DateTime TakenAt { get; init; }
    public double Latitude { get; init; }
    public double Longitude { get; init; }
}