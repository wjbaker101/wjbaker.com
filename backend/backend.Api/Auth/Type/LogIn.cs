namespace backend.Api.Auth.Type;

public sealed class LogInRequest
{
    public string Username { get; init; }
    public string Password { get; init; }
}

public sealed class LogInResponse
{
    public string Jwt { get; init; }
}