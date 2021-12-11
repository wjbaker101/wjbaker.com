using backend.Core;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;

namespace backend.Data.Database;

public interface IApiDatabase
{
    ISessionFactory SessionFactory();
}

public sealed class ApiDatabase : IApiDatabase
{
    private readonly ISessionFactory _sessionFactory;

    public ApiDatabase(ApiSecretSettings apiSecretSettings)
    {
        _sessionFactory = CreateSessionFactory(apiSecretSettings.Database);
    }

    private ISessionFactory CreateSessionFactory(ApiSecretSettings.DatabaseSettings databaseSettings)
    {
        return Fluently.Configure()
            .Database(PostgreSQLConfiguration.Standard.ConnectionString(c => c
                .Host(databaseSettings.Host)
                .Port(databaseSettings.Port)
                .Database(databaseSettings.Database)
                .Username(databaseSettings.Username)
                .Password(databaseSettings.Password)))
            .Mappings(m => m.FluentMappings.AddFromAssemblyOf<ApiDatabase>())
            .BuildSessionFactory();
    }

    public ISessionFactory SessionFactory()
    {
        return _sessionFactory;
    }
}