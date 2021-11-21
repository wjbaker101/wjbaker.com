using backend.Api.Projects;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IProjectsService, ProjectsService>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();