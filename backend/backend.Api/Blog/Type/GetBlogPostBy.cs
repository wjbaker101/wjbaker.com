namespace backend.Api.Blog.Type;

public sealed class GetBlogPostByResponse
{
    public Guid Reference { get; init; }
    public string Title { get; init; }
    public string UrlSlug { get; init; }
    public DateTime PostedAt { get; init; }
    public string Summary { get; init; }
    public string Content { get; init; }
}