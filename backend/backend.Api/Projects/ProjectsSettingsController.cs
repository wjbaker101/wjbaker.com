using backend.Api.Auth.Attribute;
using backend.Api.Projects.Type;
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

    [HttpPut]
    [Route("settings")]
    [RequiresAuthentication]
    [RequiresAdmin]
    public IActionResult UpdateProjectsSettings([FromBody] UpdateProjectsSettingsRequest request)
    {
        var result = _projectsSettingsService.UpdateProjectsSettings(request);

        return ToApiResponse(result);
    }
}