namespace backend.Api.Projects.Type;

public sealed class UpdateProjectsSettingsRequest
{
    public List<Guid> DisplayOrder { get; init; }
}

public sealed class UpdateProjectsSettingsResponse
{
    public List<ProjectDisplayOrder> DisplayOrder { get; init; }

    public sealed class ProjectDisplayOrder
    {
        public Guid Reference { get; init; }
        public string Title { get; init; }
    }
}