using backend.Data.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Api.Auth;

public sealed class RequiresAuthenticationAttribute : ServiceFilterAttribute
{
    public RequiresAuthenticationAttribute() : base(typeof(AttributeImplementation))
    {
    }

    private sealed class AttributeImplementation : IActionFilter
    {
        private readonly IApiDatabase _apiDatabase;

        public AttributeImplementation(IApiDatabase apiDatabase)
        {
            _apiDatabase = apiDatabase;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var authorizationHeader = context.HttpContext.Request.Headers.Authorization.ToString();
            if (string.IsNullOrWhiteSpace(authorizationHeader))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var split = authorizationHeader.Split(" ");
            if (split.Length != 2)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var jwt = split[1];
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}