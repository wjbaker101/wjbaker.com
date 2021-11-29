using backend.Core.Type;
using Microsoft.AspNetCore.Mvc;

namespace backend.Api.Gallery;

[Route("api/gallery")]
public sealed class GalleryController : ApiController
{
    private readonly IGalleryService _galleryService;

    public GalleryController(IGalleryService galleryService)
    {
        _galleryService = galleryService;
    }

    [HttpGet]
    [Route("albums")]
    public IActionResult GetAlbums()
    {
        var result = _galleryService.GetAlbums();

        return ToApiResponse(result);
    }

    [HttpGet]
    [Route("album/{id}/photos")]
    public IActionResult GetPhotosByAlbum([FromRoute] string id)
    {
        var result = _galleryService.GetPhotosByAlbum(id);

        return ToApiResponse(result);
    }
}