namespace backend.Api.Gallery.Type;

public sealed class UploadImageToAdminAlbumRequest
{
    public IFormFile Image { get; init; }
}