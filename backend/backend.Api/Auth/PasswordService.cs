using System.Security.Cryptography;
using System.Text;

namespace backend.Api.Auth;

public interface IPasswordService
{
    (string hashedPassword, Guid salt) HashPassword(string password, Guid? existingSalt = null);
    bool VerifyPassword(string password, string expectedPassword, Guid salt);
}

public sealed class PasswordService : IPasswordService
{
    private readonly Guid _pepper = Guid.Parse("588d1dca-9785-4caf-aa56-7a4c772474e1");

    public (string hashedPassword, Guid salt) HashPassword(string password, Guid? existingSalt = null)
    {
        using var hasher = SHA512.Create();

        var salt = existingSalt ?? Guid.NewGuid();
        var hashedPassword = Convert.ToBase64String(hasher.ComputeHash(Encoding.UTF8.GetBytes(password + salt + _pepper)));

        return (hashedPassword, salt);
    }

    public bool VerifyPassword(string password, string expectedPassword, Guid salt)
    {
        var result = HashPassword(password, salt);

        return expectedPassword == result.hashedPassword;
    }
}