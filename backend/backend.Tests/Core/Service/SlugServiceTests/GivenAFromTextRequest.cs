using backend.Core.Services;
using backend.Core.Type;
using NUnit.Framework;

namespace backend.Tests.Core.Service.SlugServiceTests;

[TestFixture("Test Slug", "test-slug")]
[TestFixture("Test  Slug", "test-slug")]
[TestFixture("Test   Slug", "test-slug")]
[TestFixture("Test   Slug", "test-slug")]
[TestFixture("Test-SLUG", "test-slug")]
[Parallelizable]
public sealed class GivenAFromTextRequest
{
    private readonly string _before;
    private readonly string _after;
    
    private Result<string> _result = null!;

    public GivenAFromTextRequest(string before, string after)
    {
        _before = before;
        _after = after;
    }

    [OneTimeSetUp]
    public void Setup()
    {
        _result = SlugService.FromText(_before);
    }

    [Test]
    public void ThenTheCorrectUrlSlugIsReturned()
    {
        Assert.That(_result.Value, Is.EqualTo(_after));
    }
}