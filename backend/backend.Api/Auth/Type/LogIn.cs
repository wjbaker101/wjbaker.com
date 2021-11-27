using backend.Data.Record;

namespace backend.Api.Auth.Type;

public sealed class LogInRequest
{
    public string Username { get; init; }
    public string Password { get; init; }
}

public sealed class LogInResponse
{
    public string Jwt { get; init; }
    public long ExpiresAt { get; init; }
    public UserDetails User { get; init; }

    public sealed class UserDetails
    {
        public Guid Reference { get; init; }
        public UserType Type { get; init; }
    }
}