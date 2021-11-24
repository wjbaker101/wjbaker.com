using backend.Data.Record;
using Newtonsoft.Json;

namespace backend.Api.Auth.Type;

public sealed class RequestContext
{
    public const string IDENTIFIER = "RequestContext";

    [JsonProperty("userRef")]
    public Guid UserReference { get; init; }

    [JsonProperty("userType")]
    public UserType UserType { get; init; }
}