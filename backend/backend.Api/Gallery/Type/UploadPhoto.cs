namespace backend.Api.Gallery.Type;

public sealed class UploadPhotoRequest
{
    public string Title { get; init; }
    public string Description { get; init; }
    public string Tags { get; init; }
    public IFormFile Photo { get; init; }
    public bool IsPublic { get; init; }
}

public sealed class UploadPhotoResponse
{
    public string Id { get; init; }
    public string Title { get; init; }
    public DateTime TakenAt { get; init; }
    public double? Latitude { get; init; }
    public double? Longitude { get; init; }
    public string ImageUrlLarge { get; init; }
}