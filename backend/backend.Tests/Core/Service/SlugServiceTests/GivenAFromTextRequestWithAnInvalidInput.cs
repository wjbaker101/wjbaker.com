using backend.Core.Services;
using backend.Core.Type;
using NUnit.Framework;

namespace backend.Tests.Core.Service.SlugServiceTests;

[TestFixture(null, "Url slug cannot be blank, please try again.")]
[TestFixture("", "Url slug cannot be blank, please try again.")]
[TestFixture(" ", "Url slug cannot be blank, please try again.")]
[TestFixture("---", "Unable to create Url slug.")]
[Parallelizable]
public sealed class GivenAFromTextRequestWithAnInvalidInput
{
    private readonly string _before;
    private readonly string _failureMessage;

    private Result<string> _result = null!;

    public GivenAFromTextRequestWithAnInvalidInput(string before, string failureMessage)
    {
        _before = before;
        _failureMessage = failureMessage;
    }

    [OneTimeSetUp]
    public void Setup()
    {
        _result = SlugService.FromText(_before);
    }

    [Test]
    public void ThenTheResultIsAFailure()
    {
        Assert.That(_result.IsFailure, Is.True);
    }

    [Test]
    public void ThenTheCorrectFailureMessageIsReturned()
    {
        Assert.That(_result.FailureMessage, Is.EqualTo(_failureMessage));
    }
}