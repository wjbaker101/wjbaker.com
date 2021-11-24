using backend.Api.Auth;
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

    [HttpGet]
    [Route("post/{reference:guid}")]
    public IActionResult GetBlogPostByReference([FromRoute] Guid reference)
    {
        var result = _blogService.GetBlogPostByReference(reference);

        return ToApiResponse(result);
    }

    [HttpGet]
    [Route("post/{urlSlug}")]
    public IActionResult GetBlogPostByUrlSlug([FromRoute] string urlSlug)
    {
        var result = _blogService.GetBlogPostByUrlSlug(urlSlug);

        return ToApiResponse(result);
    }

    [HttpPost]
    [Route("post")]
    [RequiresAuthentication]
    public IActionResult CreateBlogPost([FromBody] CreateBlogPostRequest request)
    {
        var result = _blogService.CreateBlogPost(request);

        return ToApiResponse(result);
    }

    [HttpPut]
    [Route("post/{reference:guid}")]
    [RequiresAuthentication]
    public IActionResult UpdateBlogPost([FromRoute] Guid reference, [FromBody] UpdateBlogPostRequest request)
    {
        var result = _blogService.UpdateBlogPost(reference, request);

        return ToApiResponse(result);
    }
}