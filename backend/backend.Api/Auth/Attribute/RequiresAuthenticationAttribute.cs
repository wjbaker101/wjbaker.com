using backend.Api.Auth.Type;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Api.Auth.Attribute;

public sealed class RequiresAuthenticationAttribute : TypeFilterAttribute
{
    public RequiresAuthenticationAttribute() : base(typeof(AttributeImplementation))
    {
    }

    private sealed class AttributeImplementation : IActionFilter
    {
        private readonly IJwtService _jwtService;

        public AttributeImplementation(IJwtService jwtService)
        {
            _jwtService = jwtService;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var authorizationHeader = context.HttpContext.Request.Headers.Authorization.ToString();
            if (string.IsNullOrWhiteSpace(authorizationHeader))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var split = authorizationHeader.Split("Bearer ");
            if (split.Length != 2)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var verifyResult = _jwtService.Verify(split[1]);
            if (verifyResult.IsFailure)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            context.HttpContext.Items[RequestContext.IDENTIFIER] = verifyResult.Value;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}