﻿using backend.Api.Projects.Type;
using backend.Core.Services;
using backend.Core.Type;
using backend.Data.Database;
using backend.Data.Record;
using NHibernate.Linq;
using System.Data;

namespace backend.Api.Projects;

public interface IProjectsService
{
    Result<SearchProjectsResponse> SearchProjects(int page);
    Result<GetProjectByResponse> GetProjectByReference(Guid reference);
    Result<GetProjectByResponse> GetProjectByUrlSlug(string urlSlug);
    Result<CreateProjectResponse> CreateProject(CreateProjectRequest request);
    Result<UpdateProjectResponse> UpdateProject(Guid reference, UpdateProjectRequest request);
}

public sealed class ProjectsService : IProjectsService
{
    private readonly IApiDatabase _apiDatabase;
    private readonly IProjectsSettingsService _projectsSettingsService;

    public ProjectsService(IApiDatabase apiDatabase, IProjectsSettingsService projectsSettingsService)
    {
        _apiDatabase = apiDatabase;
        _projectsSettingsService = projectsSettingsService;
    }

    public Result<SearchProjectsResponse> SearchProjects(int page)
    {
        const int pageSize = 6;

        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var query = session
            .Query<ProjectRecord>()
            .ToFuture(); 

        var total = query.Count();

        var tagFrequencies = query
            .SelectMany(x => x.Tags)
            .GroupBy(x => x.ToLower())
            .Select(x => new SearchProjectsResponse.TagFrequency
            {
                Tag = x.First(),
                Frequency = x.Count()
            })
            .OrderByDescending(x => x.Frequency)
            .ThenBy(x => x.Tag)
            .ToList();

        var settings = session
            .Query<ProjectsSettingsRecord>()
            .SingleOrDefault();

        if (settings == null)
            return Result<SearchProjectsResponse>.Failure("Unable to retrieve the projects settings.");

        var projects = query
            .OrderBy(x => settings.DisplayOrder.IndexOf(x.Reference))
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        transaction.Commit();

        return Result<SearchProjectsResponse>.Of(new SearchProjectsResponse
        {
            Total = total,
            PageSize = pageSize,
            Projects = projects.ConvertAll(x => new SearchProjectsResponse.Project
            {
                Reference = x.Reference,
                Title = x.Title,
                UrlSlug = x.UrlSlug,
                StartedAt = x.StartedAt,
                Summary = x.Summary,
                SourceCodeUrl = x.SourceCodeUrl,
                PreviewImageUrl = x.PreviewImageUrl,
                DisplayOrder = x.DisplayOrder,
                CreatedAt = x.CreatedAt,
                ViewUrl = x.ViewUrl,
                Tags = x.Tags.OrderBy(t => t).ToList()
            }),
            TagFrequencies = tagFrequencies
        });
    }

    public Result<GetProjectByResponse> GetProjectByReference(Guid reference)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var project = session
            .Query<ProjectRecord>()
            .SingleOrDefault(x => x.Reference == reference);

        if (project == null)
            return Result<GetProjectByResponse>.Failure($"Unable to find project with reference: {reference}.");

        return Result<GetProjectByResponse>.Of(new GetProjectByResponse
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
            CreatedAt = project.CreatedAt,
            ViewUrl = project.ViewUrl,
            Tags = project.Tags
        });
    }

    public Result<GetProjectByResponse> GetProjectByUrlSlug(string urlSlug)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var project = session
            .Query<ProjectRecord>()
            .SingleOrDefault(x => x.UrlSlug.ToLower() == urlSlug.ToLower());

        if (project == null)
            return Result<GetProjectByResponse>.Failure($"Unable to find project with url slug: {urlSlug}.");

        return Result<GetProjectByResponse>.Of(new GetProjectByResponse
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
            CreatedAt = project.CreatedAt,
            ViewUrl = project.ViewUrl,
            Tags = project.Tags
        });
    }

    public Result<CreateProjectResponse> CreateProject(CreateProjectRequest request)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var urlSlug = SlugService.FromText(request.Title, request.UrlSlug);
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
            CreatedAt = DateTime.UtcNow,
            ViewUrl = request.ViewUrl,
            Tags = request.Tags
        };
        session.Save(project);

        transaction.Commit();

        var settingsResult = _projectsSettingsService.GetProjectsSettings();
        if (settingsResult.IsFailure)
            return Result<CreateProjectResponse>.From(settingsResult);

        _projectsSettingsService.UpdateProjectsSettings(new UpdateProjectsSettingsRequest
        {
            DisplayOrder = settingsResult.Value.DisplayOrder
                .Select(x => x.Reference)
                .Concat(new [] { project.Reference })
                .ToList()
        });

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
            CreatedAt = project.CreatedAt,
            ViewUrl = project.ViewUrl,
            Tags = project.Tags
        });
    }

    public Result<UpdateProjectResponse> UpdateProject(Guid reference, UpdateProjectRequest request)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var project = session
            .Query<ProjectRecord>()
            .SingleOrDefault(x => x.Reference == reference);

        if (project == null)
            return Result<UpdateProjectResponse>.Failure($"Unable to find project with reference: {reference}.");

        var urlSlugResult = SlugService.FromText(request.Title, request.UrlSlug);
        if (urlSlugResult.IsFailure)
            return Result<UpdateProjectResponse>.From(urlSlugResult);

        project.Title = request.Title;
        project.UrlSlug = urlSlugResult.Value;
        project.StartedAt = request.StartedAt;
        project.Summary = request.Summary;
        project.Description = request.Description;
        project.SourceCodeUrl = request.SourceCodeUrl;
        project.PreviewImageUrl = request.PreviewImageUrl;
        project.DisplayOrder = request.DisplayOrder;
        project.ViewUrl = request.ViewUrl;
        project.Tags = request.Tags;

        session.Update(project);

        transaction.Commit();

        return Result<UpdateProjectResponse>.Of(new UpdateProjectResponse
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
            CreatedAt = project.CreatedAt,
            ViewUrl = project.ViewUrl,
            Tags = project.Tags
        });
    }
}