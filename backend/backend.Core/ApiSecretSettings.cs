namespace backend.Core;

public sealed class ApiSecretSettings
{
    public DatabaseSettings Database { get; init; }
    public JwtSettings Jwt { get; init; }
    public FlickrSettings Flickr { get; init; }

    public sealed class DatabaseSettings
    {
        public string Host { get; init; }
        public int Port { get; init; }
        public string Database { get; init; }
        public string Username { get; init; }
        public string Password { get; init; }
    }

    public sealed class JwtSettings
    {
        public string Secret { get; init; }
    }

    public sealed class FlickrSettings
    {
        public string ApiKey { get; init; }
        public string ApiSecret { get; init; }
        public string Token { get; init; }
        public string TokenSecret { get; init; }
        public Dictionary<string, string> AdminAlbums { get; init; }
    }
}