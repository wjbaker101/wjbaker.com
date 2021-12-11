namespace backend.Core.Client.Flickr.Type;

public sealed class AddPhotoToPhotosetRequest
{
    public string PhotoId { get; init; }
    public string PhotosetId { get; init; }
}