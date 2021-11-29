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
}