using backend.Data.Database;

namespace backend.Api.Blog;

public interface IBlogService
{
}

public sealed class BlogService : IBlogService
{
    private readonly IApiDatabase _apiDatabase;

    public BlogService(IApiDatabase apiDatabase)
    {
        _apiDatabase = apiDatabase;
    }
}