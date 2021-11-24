using backend.Api.Auth.Type;
using backend.Core.Type;
using JWT.Algorithms;
using JWT.Builder;

namespace backend.Api.Auth;

public sealed class JwtService
{
    public Result<string> Create(RequestContext requestContext)
    {
        try
        {
            return Result<string>.Of(JwtBuilder.Create()
                .WithAlgorithm(new HMACSHA512Algorithm())
                .AddClaim("exp", DateTimeOffset.UtcNow.AddDays(1).ToUnixTimeSeconds())
                .AddClaim("userRef", requestContext.UserReference)
                .AddClaim("userType", requestContext.UserType)
                .Encode());
        }
        catch
        {
            return Result<string>.Failure("Unable to create JWT token.");
        }
    }
}