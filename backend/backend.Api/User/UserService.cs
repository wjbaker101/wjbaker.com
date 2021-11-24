using backend.Api.Auth;
using backend.Api.User.Type;
using backend.Core.Type;
using backend.Data.Database;
using backend.Data.Record;
using System.Data;

namespace backend.Api.User;

public interface IUserService
{
    Result<GetUserByResponse> GetUserByReference(Guid reference);
    Result<CreateUserResponse> CreateUser(CreateUserRequest request);
}

public sealed class UserService : IUserService
{
    private readonly IApiDatabase _apiDatabase;
    private readonly IPasswordService _passwordService;

    public UserService(IApiDatabase apiDatabase, IPasswordService passwordService)
    {
        _apiDatabase = apiDatabase;
        _passwordService = passwordService;
    }

    public Result<GetUserByResponse> GetUserByReference(Guid reference)
    {
        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var user = session
            .Query<UserRecord>()
            .SingleOrDefault(x => x.Reference == reference);

        if (user == null)
            return Result<GetUserByResponse>.Failure($"Unable to find user with the given reference: {reference}.");

        transaction.Commit();

        return Result<GetUserByResponse>.Of(new GetUserByResponse
        {
            Reference = user.Reference,
            Username = user.Username,
            CreatedAt = user.CreatedAt,
            Type = user.Type
        });
    }

    public Result<CreateUserResponse> CreateUser(CreateUserRequest request)
    {
        var (hashedPassword, salt) = _passwordService.HashPassword(request.Password);

        using var session = _apiDatabase.SessionFactory().OpenSession();
        using var transaction = session.BeginTransaction(IsolationLevel.ReadCommitted);

        var user = new UserRecord
        {
            Reference = Guid.NewGuid(),
            Username = request.Username,
            Password = hashedPassword,
            PasswordSalt = salt,
            CreatedAt = DateTime.UtcNow,
            Type = UserType.Basic
        };
        session.Save(user);

        transaction.Commit();

        return Result<CreateUserResponse>.Of(new CreateUserResponse
        {
            Reference = user.Reference,
            Username = user.Username,
            CreatedAt = user.CreatedAt,
            Type = user.Type
        });
    }
}