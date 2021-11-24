using backend.Api.User.Type;
using backend.Core.Type;
using backend.Data.Database;
using backend.Data.Record;
using System.Data;

namespace backend.Api.User;

public interface IUserService
{
    Result<GetUserByResponse> GetUserByReference(Guid reference);
}

public sealed class UserService : IUserService
{
    private readonly IApiDatabase _apiDatabase;

    public UserService(IApiDatabase apiDatabase)
    {
        _apiDatabase = apiDatabase;
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
}