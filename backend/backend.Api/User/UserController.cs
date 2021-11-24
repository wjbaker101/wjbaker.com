using backend.Core.Type;
using Microsoft.AspNetCore.Mvc;

namespace backend.Api.User;

[Route("api/user")]
public sealed class UserController : ApiController
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Route("{reference:guid}")]
    public IActionResult GetUserByReference([FromRoute] Guid reference)
    {
        var result = _userService.GetUserByReference(reference);

        return ToApiResponse(result);
    }
}