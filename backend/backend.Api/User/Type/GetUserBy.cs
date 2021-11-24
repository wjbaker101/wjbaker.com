using backend.Data.Record;

namespace backend.Api.User.Type;

public sealed class GetUserByResponse
{
    public Guid Reference { get; init; }
    public string Username { get; set; }
    public DateTime CreatedAt { get; init; }
    public UserType Type { get; set; }
}