using backend.Data.Record;

namespace backend.Api.User.Type;

public sealed class GetUserByResponse
{
    public Guid Reference { get; init; }
    public string Username { get; init; }
    public DateTime CreatedAt { get; init; }
    public UserType Type { get; init; }
}