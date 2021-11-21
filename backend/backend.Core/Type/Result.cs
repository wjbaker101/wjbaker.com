namespace backend.Core.Type;

public class Result
{
    public string? FailureMessage { get; init; }

    public static Result Failure(string failureMessage)
    {
        return new Result
        {
            FailureMessage = failureMessage,
        };
    }
}

public sealed class Result<T> : Result
{
}