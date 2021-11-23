using backend.Api.Projects.Type;
using backend.Core.Type;
using Microsoft.AspNetCore.Mvc;

namespace backend.Api.Projects;

[Route("api")]
public sealed class ProjectsController : ApiController
{
    private readonly IProjectsService _projectsService;

    public ProjectsController(IProjectsService projectsService)
    {
        _projectsService = projectsService;
    }

    [HttpGet]
    [Route("projects")]
    public IActionResult SearchProjects([FromQuery] int page = 1)
    {
        var result = _projectsService.SearchProjects(page);
        
        return ToApiResponse(result);
    }

    [HttpGet]
    [Route("project/{reference:guid}")]
    public IActionResult GetProjectByReference([FromRoute] Guid reference)
    {
        var result = _projectsService.GetProjectByReference(reference);

        return ToApiResponse(result);
    }

    [HttpGet]
    [Route("project/{urlSlug}")]
    public IActionResult GetProjectByUrlSlug([FromRoute] string urlSlug)
    {
        var result = _projectsService.GetProjectByUrlSlug(urlSlug);

        return ToApiResponse(result);
    }

    [HttpPost]
    [Route("project")]
    public IActionResult CreateProject([FromBody] CreateProjectRequest request)
    {
        var result = _projectsService.CreateProject(request);

        return ToApiResponse(result);
    }
}