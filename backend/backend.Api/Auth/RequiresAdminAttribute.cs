using backend.Data.Record;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Api.Auth;

public sealed class RequiresAdminAttribute : TypeFilterAttribute
{
    public RequiresAdminAttribute() : base(typeof(AttributeImplementation))
    {
    }

    public sealed class AttributeImplementation : IResultFilter
    {
        private readonly IRequiresUserTypeService _requiresUserTypeService;

        public AttributeImplementation(IRequiresUserTypeService requiresUserTypeService)
        {
            _requiresUserTypeService = requiresUserTypeService;
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            _requiresUserTypeService.Handle(context, UserType.Admin);
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
        }
    }
}