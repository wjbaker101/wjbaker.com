using backend.Api.Auth.Type;
using backend.Data.Record;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Api.Auth;

public interface IRequiresUserTypeService
{
    void Handle(ResultExecutingContext context, UserType userType);
}

public sealed class RequiresUserTypeService : IRequiresUserTypeService
{
    public void Handle(ResultExecutingContext context, UserType userType)
    {
        var item = context.HttpContext.Items[RequestContext.IDENTIFIER];
        if (item is not RequestContext requestContext)
        {
            context.Result = new UnauthorizedResult();
            return;
        }
        if (requestContext.UserType != userType)
        {
            context.Result = new UnauthorizedResult();
            return;
        }
    }
}