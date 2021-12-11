namespace backend.Api.AdminAlbum.Type;

public sealed class UploadImageToAdminAlbumRequest
{
    public IFormFile Image { get; init; }
}