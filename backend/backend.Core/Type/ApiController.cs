using Microsoft.AspNetCore.Mvc;

namespace backend.Core.Type;

public abstract class ApiController : Controller
{
    public IActionResult ToApiResponse(Result result)
    {
        if (result.IsFailure)
            return BadRequest();
        
        return Ok();
    }

    public IActionResult ToApiResponse<T>(Result<T> result)
    {
        if (result.IsFailure)
            return BadRequest();

        return Ok(ApiResultResponse<T>.Of(result.Value!));
    }
}