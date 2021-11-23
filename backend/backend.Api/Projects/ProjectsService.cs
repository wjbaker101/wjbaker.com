using backend.Api.Projects.Type;
using backend.Core.Type;
using backend.Data.Database;
using backend.Data.Record;
using System.Data;
using System.Text.RegularExpressions;
using NHibernate.Linq;

namespace backend.Api.Projects;

public interface IProjectsService
{
    Result<SearchProjectsResponse> SearchProjects(int page);
    Result<CreateProjectResponse> CreateProject(CreateProjectRequest request);
}

public sealed class ProjectsService : IProjectsService
{
    private readonly IApiDatabase _apiDatabase;

    public ProjectsService(IApiDatabase apiDatabase)
    {
        _apiDatabase = apiDatabase;
    }

    public Result<SearchProjectsResponse> SearchProjects(int page)
    {
        const int pageSize = 1;

        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var query = session
            .Query<ProjectRecord>()
            .ToFuture();

        var total = query.Count();

        var projects = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        transaction.Commit();

        return Result<SearchProjectsResponse>.Of(new SearchProjectsResponse
        {
            Total = total,
            Projects = projects.ConvertAll(x => new SearchProjectsResponse.Project
            {
                Reference = x.Reference,
                Title = x.Title,
                UrlSlug = x.UrlSlug,
                StartedAt = x.StartedAt,
                Summary = x.Summary,
                Description = x.Description,
                SourceCodeUrl = x.SourceCodeUrl,
                PreviewImageUrl = x.PreviewImageUrl,
                DisplayOrder = x.DisplayOrder,
                CreatedAt = x.CreatedAt
            })
        });
    }

    public Result<CreateProjectResponse> CreateProject(CreateProjectRequest request)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var urlSlug = GenerateUrlSlug(request.UrlSlug, request.Title);
        if (urlSlug.IsFailure)
            return Result<CreateProjectResponse>.From(urlSlug);
        
        var project = new ProjectRecord
        {
            Reference = Guid.NewGuid(),
            Title = request.Title,
            UrlSlug = urlSlug.Value,
            StartedAt = request.StartedAt,
            Summary = request.Summary,
            Description = request.Description,
            SourceCodeUrl = request.SourceCodeUrl,
            PreviewImageUrl = request.PreviewImageUrl,
            DisplayOrder = request.DisplayOrder,
            CreatedAt = DateTime.UtcNow
        };
        session.Save(project);

        transaction.Commit();

        return Result<CreateProjectResponse>.Of(new CreateProjectResponse
        {
            Reference = project.Reference,
            Title = project.Title,
            UrlSlug = project.UrlSlug,
            StartedAt = project.StartedAt,
            Summary = project.Summary,
            Description = project.Description,
            SourceCodeUrl = project.SourceCodeUrl,
            PreviewImageUrl = project.PreviewImageUrl,
            DisplayOrder = project.DisplayOrder,
            CreatedAt = project.CreatedAt
        });
    }

    private static Result<string> GenerateUrlSlug(string? urlSlug, string title)
    {
        if (urlSlug != null)
            return Result<string>.Of(urlSlug);

        var preSanitised = title.ToLower().Replace("  ", "").Replace(" ", "-");
        var sanitised = Regex.Replace(preSanitised, @"[^\w\d]+", "");

        if (sanitised.Length == 0)
            return Result<string>.Failure("Unable to create Url slug.");

        return Result<string>.Of(sanitised);
    }
}