using backend.Api.Blog.Type;
using backend.Core.Type;
using Microsoft.AspNetCore.Mvc;

namespace backend.Api.Blog;

[Route("api/blog")]
public sealed class BlogController : ApiController
{
    private readonly IBlogService _blogService;

    public BlogController(IBlogService blogService)
    {
        _blogService = blogService;
    }

    [HttpGet]
    [Route("posts")]
    public IActionResult SearchBlog([FromQuery] int page = 1)
    {
        var result = _blogService.SearchBlog(page);

        return ToApiResponse(result);
    }

    [HttpPost]
    [Route("post")]
    public IActionResult CreateBlogPost([FromBody] CreateBlogPostRequest request)
    {
        var result = _blogService.CreateBlogPost(request);

        return ToApiResponse(result);
    }
}