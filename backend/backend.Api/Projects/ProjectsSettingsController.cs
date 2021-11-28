using backend.Api.Auth.Attribute;
using backend.Core.Type;
using Microsoft.AspNetCore.Mvc;

namespace backend.Api.Projects;

[Route("api/projects")]
public sealed class ProjectsSettingsController : ApiController
{
    private readonly IProjectsSettingsService _projectsSettingsService;

    public ProjectsSettingsController(IProjectsSettingsService projectsSettingsService)
    {
        _projectsSettingsService = projectsSettingsService;
    }

    [HttpGet]
    [Route("settings")]
    [RequiresAuthentication]
    [RequiresAdmin]
    public IActionResult GetProjectsSettings()
    {
        var result = _projectsSettingsService.GetProjectsSettings();

        return ToApiResponse(result);
    }
}