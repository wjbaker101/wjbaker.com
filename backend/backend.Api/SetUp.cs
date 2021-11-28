using backend.Api.Auth;
using backend.Api.Auth.Attribute;
using backend.Api.Auth.Type;
using backend.Api.Blog;
using backend.Api.Projects;
using backend.Api.User;
using backend.Data.Database;
using backend.Data.Type;

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
        builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("Database"));
        builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));

        builder.Services.AddScoped<RequiresAuthenticationAttribute>();
        builder.Services.AddScoped<IRequiresUserTypeService, RequiresUserTypeService>();
        builder.Services.AddScoped<RequiresAdminAttribute>();

        builder.Services.AddSingleton<IApiDatabase, ApiDatabase>();
        builder.Services.AddSingleton<IProjectsService, ProjectsService>();
        builder.Services.AddSingleton<IProjectsSettingsService, ProjectsSettingsService>();
        builder.Services.AddSingleton<IBlogService, BlogService>();
        builder.Services.AddSingleton<IAuthService, AuthService>();
        builder.Services.AddSingleton<IPasswordService, PasswordService>();
        builder.Services.AddSingleton<IJwtService, JwtService>();
        builder.Services.AddSingleton<IUserService, UserService>();

        builder.Services.AddControllers();
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