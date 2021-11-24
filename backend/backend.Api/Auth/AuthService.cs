using backend.Api.Auth.Type;
using backend.Core.Type;
using backend.Data.Database;
using backend.Data.Record;
using System.Data;

namespace backend.Api.Auth;

public interface IAuthService
{
    Result<LogInResponse> LogIn(LogInRequest request);
}

public sealed class AuthService : IAuthService
{
    private readonly IApiDatabase _apiDatabase;
    private readonly IPasswordService _passwordService;
    private readonly IJwtService _jwtService;

    public AuthService(IApiDatabase apiDatabase, IPasswordService passwordService, IJwtService jwtService)
    {
        _apiDatabase = apiDatabase;
        _passwordService = passwordService;
        _jwtService = jwtService;
    }

    public Result<LogInResponse> LogIn(LogInRequest request)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var user = session
            .Query<UserRecord>()
            .SingleOrDefault(x => x.Username.ToLower() == request.Username.ToLower());

        if (user == null)
            return Result<LogInResponse>.Failure($"Unable to log in, the given user could not be found with username: {request.Username}.");

        var isPasswordValid = _passwordService.VerifyPassword(request.Password, user.Password, user.PasswordSalt);
        if (!isPasswordValid)
            return Result<LogInResponse>.Failure("Unable to log in, the given credentials we incorrect.");

        var jwtResult = _jwtService.Create(new RequestContext
        {
            UserReference = user.Reference,
            UserType = user.Type
        });
        if (jwtResult.IsFailure)
            return Result<LogInResponse>.From(jwtResult);

        return Result<LogInResponse>.Of(new LogInResponse
        {
            Jwt = jwtResult.Value
        });
    }
}