namespace backend.Api.Projects.Type;

public sealed class CreateProjectRequest
{
    public string Title { get; init; }
    public string? UrlSlug { get; init; }
    public DateTime StartedAt { get; init; }
    public string Summary { get; init; }
    public string Description { get; init; }
    public string? SourceCodeUrl { get; init; }
    public string? PreviewImageUrl { get; init; }
    public int DisplayOrder { get; init; }
    public string? ViewUrl { get; init; }
    public List<string> Tags { get; init; } = new();
}

public sealed class CreateProjectResponse
{
    public Guid Reference { get; init; }
    public string Title { get; init; }
    public string UrlSlug { get; init; }
    public DateTime StartedAt { get; init; }
    public string Summary { get; init; }
    public string Description { get; init; }
    public string? SourceCodeUrl { get; init; }
    public string? PreviewImageUrl { get; init; }
    public int DisplayOrder { get; init; }
    public DateTime CreatedAt { get; init; }
    public string? ViewUrl { get; init; }
    public List<string> Tags { get; init; } = new();
}