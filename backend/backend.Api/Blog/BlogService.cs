using backend.Api.Blog.Type;
using backend.Core.Services;
using backend.Core.Type;
using backend.Data.Database;
using backend.Data.Record;
using NHibernate.Linq;
using System.Data;

namespace backend.Api.Blog;

public interface IBlogService
{
    Result<SearchBlogResponse> SearchBlog(int page);
    Result<GetBlogPostByResponse> GetBlogPostByReference(Guid reference);
    Result<GetBlogPostByResponse> GetBlogPostByUrlSlug(string urlSlug);
    Result<CreateBlogPostResponse> CreateBlogPost(CreateBlogPostRequest request);
    Result<UpdateBlogPostResponse> UpdateBlogPost(Guid reference, UpdateBlogPostRequest request);
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
        const int pageSize = 6;

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

    public Result<GetBlogPostByResponse> GetBlogPostByReference(Guid reference)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var blogPost = session
            .Query<BlogPostRecord>()
            .SingleOrDefault(x => x.Reference == reference);

        if (blogPost == null)
            return Result<GetBlogPostByResponse>.Failure($"Unable to find blog post with reference: {reference}.");

        transaction.Commit();
        
        return Result<GetBlogPostByResponse>.Of(new GetBlogPostByResponse
        {
            Reference = blogPost.Reference,
            Title = blogPost.Title,
            UrlSlug = blogPost.UrlSlug,
            PostedAt = blogPost.PostedAt,
            Summary = blogPost.Summary,
            Content = blogPost.Content
        });
    }

    public Result<GetBlogPostByResponse> GetBlogPostByUrlSlug(string urlSlug)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var blogPost = session
            .Query<BlogPostRecord>()
            .SingleOrDefault(x => x.UrlSlug.ToLower() == urlSlug.ToLower());

        if (blogPost == null)
            return Result<GetBlogPostByResponse>.Failure($"Unable to find blog post with url slug: {urlSlug}.");

        transaction.Commit();
        
        return Result<GetBlogPostByResponse>.Of(new GetBlogPostByResponse
        {
            Reference = blogPost.Reference,
            Title = blogPost.Title,
            UrlSlug = blogPost.UrlSlug,
            PostedAt = blogPost.PostedAt,
            Summary = blogPost.Summary,
            Content = blogPost.Content
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

    public Result<UpdateBlogPostResponse> UpdateBlogPost(Guid reference, UpdateBlogPostRequest request)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var blogPost = session
            .Query<BlogPostRecord>()
            .SingleOrDefault(x => x.Reference == reference);

        if (blogPost == null)
            return Result<UpdateBlogPostResponse>.Failure($"Unable to find blog post with reference: {reference}.");

        var urlSlugResult = SlugService.FromText(request.Title, request.UrlSlug);
        if (urlSlugResult.IsFailure)
            return Result<UpdateBlogPostResponse>.From(urlSlugResult);

        blogPost.Title = request.Title;
        blogPost.Title = request.Title;
        blogPost.UrlSlug = urlSlugResult.Value;
        blogPost.Summary = request.Summary;
        blogPost.Content = request.Content;

        session.Update(blogPost);

        transaction.Commit();

        return Result<UpdateBlogPostResponse>.Of(new UpdateBlogPostResponse
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