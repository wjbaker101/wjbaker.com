using backend.Data.Record;

namespace backend.Api.User.Type;

public sealed class CreateUserRequest
{
    public string Username { get; init; }
    public string Password { get; init; }
}

public sealed class CreateUserResponse
{
    public Guid Reference { get; init; }
    public string Username { get; init; }
    public DateTime CreatedAt { get; init; }
    public UserType Type { get; init; }
}