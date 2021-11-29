using NHibernate.Engine;
using NHibernate.SqlTypes;
using NHibernate.UserTypes;
using Npgsql;
using NpgsqlTypes;
using System.Data;
using System.Data.Common;
using Utf8Json;

namespace backend.Data.Type;

[Serializable]
public sealed class JsonBlob<T> : IUserType where T : class
{
    public System.Type ReturnedType => typeof(T);
    public bool IsMutable => true;

    public new bool Equals(object? x, object? y)
    {
        if (x == null && y == null)
            return true;
        if (x == null || y == null)
            return false;

        var jsonX = JsonSerializer.ToJsonString(x);
        var jsonY = JsonSerializer.ToJsonString(y);

        return jsonX == jsonY;
    }

    public int GetHashCode(object? x)
    {
        return x == null ? 0 : x.GetHashCode();
    }

    public object? NullSafeGet(DbDataReader rs, string[] names, ISessionImplementor session, object owner)
    {
        if (names.Length > 1)
            throw new InvalidOperationException("Only expected 1 column.");

        if (rs[names[0]] is string value && !string.IsNullOrWhiteSpace(value))
            return JsonSerializer.Deserialize<T>(value);

        return null;
    }

    public void NullSafeSet(DbCommand cmd, object? value, int index, ISessionImplementor session)
    {
        var parameter = (NpgsqlParameter)cmd.Parameters[index];
        parameter.NpgsqlDbType = NpgsqlDbType.Json;

        if (value == null)
            parameter.Value = DBNull.Value;
        else
            parameter.Value = JsonSerializer.ToJsonString(value);
    }

    public object? DeepCopy(object? value)
    {
        if (value == null)
            return null;

        var json = JsonSerializer.ToJsonString(value);

        return JsonSerializer.Deserialize<T>(json);
    }

    public object Replace(object original, object target, object owner)
    {
        return original;
    }

    public object? Assemble(object cached, object owner)
    {
        if (cached is string json && !string.IsNullOrWhiteSpace(json))
            return JsonSerializer.Deserialize<T>(json);

        return null;
    }

    public object? Disassemble(object? value)
    {
        return value == null ? null : JsonSerializer.ToJsonString(value);
    }

    public SqlType[] SqlTypes
    {
        get
        {
            return new SqlType[]
            {
                new NpgSqlExtendedSqlType(DbType.Object, NpgsqlDbType.Json)
            };
        }
    }
}