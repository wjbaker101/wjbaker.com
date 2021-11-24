using FluentNHibernate.Mapping;

namespace backend.Data.Record;

public enum UserType
{
    Unknown = 0,
    Admin = 1,
    Basic = 2
}

public class UserRecord
{
    public virtual long Id { get; init; }
    public virtual Guid Reference { get; init; }
    public virtual string Username { get; set; }
    public virtual string Password { get; set; }
    public virtual Guid PasswordSalt { get; set; }
    public virtual DateTime CreatedAt { get; init; }
    public virtual UserType Type { get; set; }
}

public sealed class UserRecordMap : ClassMap<UserRecord>
{
    public UserRecordMap()
    {
        Schema("auth");
        Table("user");
        Id(x => x.Id, "id").GeneratedBy.SequenceIdentity("user_id_seq");
        Map(x => x.Reference, "reference");
        Map(x => x.Username, "username");
        Map(x => x.Password, "password");
        Map(x => x.PasswordSalt, "password_salt");
        Map(x => x.CreatedAt, "created_at");
        Map(x => x.Type, "type").CustomType<UserType>();
    }
}