﻿using backend.Api.Projects;
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

        builder.Services.AddSingleton<IApiDatabase, ApiDatabase>();
        builder.Services.AddSingleton<IProjectsService, ProjectsService>();

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