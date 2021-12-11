using backend.Data.Record;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Api.Auth.Attribute;

public sealed class RequiresAdminAttribute : TypeFilterAttribute
{
    public RequiresAdminAttribute() : base(typeof(AttributeImplementation))
    {
    }

    public sealed class AttributeImplementation : IActionFilter
    {
        private readonly IRequiresUserTypeService _requiresUserTypeService;

        public AttributeImplementation(IRequiresUserTypeService requiresUserTypeService)
        {
            _requiresUserTypeService = requiresUserTypeService;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _requiresUserTypeService.Handle(context, UserType.Admin);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}