using backend.Data.Record;

namespace backend.Api.Auth.Type;

public sealed class RequestContext
{
    public const string IDENTIFIER = "RequestContext";

    public Guid UserReference { get; init; }
    public UserType UserType { get; init; }
}