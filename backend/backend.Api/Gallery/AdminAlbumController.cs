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
    public IActionResult GetAdminAlbumByType(AdminAlbumType type)
    {
        var result = _adminAlbumService.GetAdminAlbumByType(type);
        
        return ToApiResponse(result);
    }
}