using backend.Api.Projects.Type;
using backend.Core.Type;
using backend.Data.Database;
using backend.Data.Record;
using System.Data;

namespace backend.Api.Projects;

public interface IProjectsSettingsService
{
    Result<GetProjectsSettings> GetProjectsSettings();
}

public sealed class ProjectsSettingsService : IProjectsSettingsService
{
    private readonly IApiDatabase _apiDatabase;

    public ProjectsSettingsService(IApiDatabase apiDatabase)
    {
        _apiDatabase = apiDatabase;
    }

    public Result<GetProjectsSettings> GetProjectsSettings()
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var settings = session
            .Query<ProjectsSettingsRecord>()
            .SingleOrDefault();

        if (settings == null)
            return Result<GetProjectsSettings>.Failure("Unable to retrieve the projects settings.");

        var displayOrder = session
            .Query<ProjectRecord>()
            .Where(x => settings.DisplayOrder.Contains(x.Reference))
            .ToList();

        transaction.Commit();

        return Result<GetProjectsSettings>.Of(new GetProjectsSettings
        {
            DisplayOrder = displayOrder.ConvertAll(x => new GetProjectsSettings.ProjectDisplayOrder
            {
                Reference = x.Reference,
                Title = x.Title
            })
        });
    }
}