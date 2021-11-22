namespace backend.Core.Type;

public class Result
{
    public string? FailureMessage { get; protected set; }

    public bool IsFailure { get; protected set; }
    public bool IsSuccess => !IsFailure;

    protected Result()
    {
        IsFailure = false;
    }

    protected Result(string failureMessage)
    {
        IsFailure = true;
        FailureMessage = failureMessage;
    }

    public static Result Success()
    {
        return new Result();
    }

    public static Result Failure(string failureMessage)
    {
        return new Result(failureMessage);
    }
}

public sealed class Result<T> : Result
{
    public T Value { get; } = default!;

    private Result(T value)
    {
        IsFailure = false;
        Value = value;
    }

    private Result(string failureMessage)
    {
        IsFailure = true;
        FailureMessage = failureMessage;
    }

    private new static Result Success() => throw new InvalidOperationException();

    public static Result<T> Of(T value)
    {
        return new Result<T>(value);
    }

    public static Result<T> From<TIn>(Result<TIn> result)
    {
        return Failure(result.FailureMessage!);
    }

    public new static Result<T> Failure(string failureMessage)
    {
        return new Result<T>(failureMessage);
    }
}