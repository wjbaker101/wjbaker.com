using backend.Api.Auth.Type;
using backend.Core.Type;
using Microsoft.AspNetCore.Mvc;

namespace backend.Api.Auth;

[Route("api/auth")]
public sealed class AuthController : ApiController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost]
    [Route("log-in")]
    public IActionResult LogIn([FromBody] LogInRequest request)
    {
        var result = _authService.LogIn(request);

        return ToApiResponse(result);
    }
}