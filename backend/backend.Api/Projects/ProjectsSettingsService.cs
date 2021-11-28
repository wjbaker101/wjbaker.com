using backend.Data.Database;

namespace backend.Api.Projects;

public interface IProjectsSettingsService
{
}

public sealed class ProjectsSettingsService : IProjectsSettingsService
{
    private readonly IApiDatabase _apiDatabase;

    public ProjectsSettingsService(IApiDatabase apiDatabase)
    {
        _apiDatabase = apiDatabase;
    }
}