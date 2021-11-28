namespace backend.Api.Projects.Type;

public sealed class GetProjectsSettings
{
    public List<ProjectDisplayOrder> DisplayOrder { get; init; }

    public sealed class ProjectDisplayOrder
    {
        public Guid Reference { get; init; }
        public string Title { get; init; }
    }
}