namespace backend.Api.Blog.Type;

public sealed class SearchBlogResponse
{
    public int Total { get; init; }
    public List<Post> Posts { get; init; }

    public sealed class Post
    {
        public Guid Reference { get; init; }
        public string Title { get; init; }
        public string UrlSlug { get; init; }
        public DateTime PostedAt { get; init; }
        public string Summary { get; init; }
        public string Content { get; init; }
    }
}