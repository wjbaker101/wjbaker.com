using backend.Api.AdminAlbum;
using backend.Api.Auth;
using backend.Api.Auth.Attribute;
using backend.Api.Blog;
using backend.Api.Gallery;
using backend.Api.Projects;
using backend.Api.User;
using backend.Core;
using backend.Core.Client.Flickr;
using backend.Data.Database;

namespace backend.Api;

public static class SetUp
{
    public static void Settings(WebApplicationBuilder builder)
    {
        var settingsFile = builder.Environment.IsDevelopment() ? "appsettings.Development.json" : "appsettings.json";

        builder.Configuration
            .SetBasePath(builder.Environment.ContentRootPath)
            .AddJsonFile(settingsFile)
            .AddJsonFile("appsettings.Secrets.json")
            .Build();
    }

    public static void Services(WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;

        services.AddSingleton(configuration.Get<ApiSecretSettings>());

        services.AddScoped<RequiresAuthenticationAttribute>();
        services.AddScoped<IRequiresUserTypeService, RequiresUserTypeService>();
        services.AddScoped<RequiresAdminAttribute>();

        services.AddSingleton<IFlickrClient, FlickrClient>();

        services.AddSingleton<IApiDatabase, ApiDatabase>();
        services.AddSingleton<IProjectsService, ProjectsService>();
        services.AddSingleton<IProjectsSettingsService, ProjectsSettingsService>();
        services.AddSingleton<IBlogService, BlogService>();
        services.AddSingleton<IAuthService, AuthService>();
        services.AddSingleton<IPasswordService, PasswordService>();
        services.AddSingleton<IJwtService, JwtService>();
        services.AddSingleton<IUserService, UserService>();
        services.AddSingleton<IAdminAlbumService, AdminAlbumService>();
        services.AddSingleton<IGalleryService, GalleryService>();

        services.AddControllers();
    }

    public static WebApplication App(WebApplicationBuilder builder)
    {
        var app = builder.Build();

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        return app;
    }
}