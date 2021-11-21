namespace backend.Core.Type;

public abstract class ApiResponse
{
    public DateTimeOffset ResponseAt { get; }

    protected ApiResponse()
    {
        ResponseAt = DateTimeOffset.UtcNow;
    }
}

public sealed class ApiResultResponse<T> : ApiResponse
{
    public T Result { get; }

    private ApiResultResponse(T result)
    {
        Result = result;
    }

    public static ApiResultResponse<T> Of(T result)
    {
        return new ApiResultResponse<T>(result);
    }
}

public sealed class ApiErrorResponse : ApiResponse
{
    public string ErrorMessage { get; }

    private ApiErrorResponse(string errorMessage)
    {
        ErrorMessage = errorMessage;
    }

    public static ApiErrorResponse Of(string errorMessage)
    {
        return new ApiErrorResponse(errorMessage);
    }
}