using backend.Api.Auth.Attribute;
using backend.Api.Gallery.Type;
using backend.Core.Type;
using Microsoft.AspNetCore.Mvc;

namespace backend.Api.Gallery;

[Route("api/admin-album")]
public sealed class AdminAlbumController : ApiController
{
    private readonly IAdminAlbumService _adminAlbumService;

    public AdminAlbumController(IAdminAlbumService adminAlbumService)
    {
        _adminAlbumService = adminAlbumService;
    }

    [HttpGet]
    [Route("{type}")]
    [RequiresAuthentication]
    [RequiresAdmin]
    public IActionResult GetAdminAlbumByType([FromRoute] AdminAlbumType type)
    {
        var result = _adminAlbumService.GetAdminAlbumByType(type);
        
        return ToApiResponse(result);
    }

    [HttpPost]
    [Route("{type}/photo")]
    [RequiresAuthentication]
    [RequiresAdmin]
    public IActionResult UploadImageToAdminAlbum([FromForm] UploadImageToAdminAlbumRequest request, [FromRoute] AdminAlbumType type)
    {
        var result = _adminAlbumService.UploadImageToAdminAlbum(request, type);

        return ToApiResponse(result);
    }
}