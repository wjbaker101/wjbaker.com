﻿using backend.Api.Auth.Type;
using backend.Core.Type;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.Extensions.Options;

namespace backend.Api.Auth;

public interface IJwtService
{
    Result<string> Create(RequestContext requestContext);
    Result<RequestContext> Verify(string jwt);
}

public sealed class JwtService : IJwtService
{
    private readonly string _secret;

    public JwtService(IOptions<JwtSettings> jwtSettings)
    {
        _secret = jwtSettings.Value.Secret;
    }

    public Result<string> Create(RequestContext requestContext)
    {
        try
        {
            return Result<string>.Of(JwtBuilder.Create()
                .WithAlgorithm(new HMACSHA512Algorithm())
                .WithSecret(_secret)
                .AddClaim("exp", DateTimeOffset.UtcNow.AddDays(1).ToUnixTimeSeconds())
                .AddClaim("userRef", requestContext.UserReference)
                .AddClaim("userType", requestContext.UserType)
                .Encode());
        }
        catch
        {
            return Result<string>.Failure("Unable to create JWT.");
        }
    }

    public Result<RequestContext> Verify(string jwt)
    {
        try
        {
            return Result<RequestContext>.Of(JwtBuilder.Create()
                .WithAlgorithm(new HMACSHA512Algorithm())
                .WithSecret(_secret)
                .MustVerifySignature()
                .Decode<RequestContext>(jwt));
        }
        catch
        {
            return Result<RequestContext>.Failure("Unable to verify JWT.");
        }
    }
}