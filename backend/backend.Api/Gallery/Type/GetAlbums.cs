namespace backend.Api.Gallery.Type;

public sealed class GetAlbumsResponse
{
    public int Total { get; init; }
    public int PageSize { get; init; }
    public List<Album> Albums { get; init; }

    public sealed class Album
    {
        public string Id { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public DateTime CreatedAt { get; init; }
        public int PhotoCount { get; init; }
    }
}