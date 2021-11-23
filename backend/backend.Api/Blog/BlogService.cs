using backend.Api.Blog.Type;
using backend.Core.Type;
using backend.Data.Database;
using backend.Data.Record;
using NHibernate.Linq;
using System.Data;
using backend.Api.Projects.Type;
using backend.Core.Services;

namespace backend.Api.Blog;

public interface IBlogService
{
    Result<SearchBlogResponse> SearchBlog(int page);
    Result<CreateBlogPostResponse> CreateBlogPost(CreateBlogPostRequest request);
}

public sealed class BlogService : IBlogService
{
    private readonly IApiDatabase _apiDatabase;

    public BlogService(IApiDatabase apiDatabase)
    {
        _apiDatabase = apiDatabase;
    }

    public Result<SearchBlogResponse> SearchBlog(int page)
    {
        const int pageSize = 1;

        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var query = session
            .Query<BlogPostRecord>()
            .ToFuture();

        var total = query.Count();

        var posts = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        transaction.Commit();

        return Result<SearchBlogResponse>.Of(new SearchBlogResponse
        {
            Total = total,
            Posts = posts.ConvertAll(x => new SearchBlogResponse.Post
            {
                Reference = x.Reference,
                Title = x.Title,
                UrlSlug = x.UrlSlug,
                PostedAt = x.PostedAt,
                Summary = x.Summary,
                Content = x.Content
            })
        });
    }

    public Result<CreateBlogPostResponse> CreateBlogPost(CreateBlogPostRequest request)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var urlSlugResult = SlugService.FromText(request.Title, request.UrlSlug);
        if (urlSlugResult.IsFailure)
            return Result<CreateBlogPostResponse>.From(urlSlugResult);

        var blogPost = new BlogPostRecord
        {
            Reference = Guid.NewGuid(),
            Title = request.Title,
            UrlSlug = urlSlugResult.Value,
            PostedAt = DateTime.UtcNow,
            Summary = request.Summary,
            Content = request.Content
        };
        session.Save(blogPost);

        transaction.Commit();

        return Result<CreateBlogPostResponse>.Of(new CreateBlogPostResponse
        {
            Reference = blogPost.Reference,
            Title = blogPost.Title,
            UrlSlug = blogPost.UrlSlug,
            PostedAt = blogPost.PostedAt,
            Summary = blogPost.Summary,
            Content = blogPost.Content
        });
    }
}