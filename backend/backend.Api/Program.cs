using backend.Api;

var builder = WebApplication.CreateBuilder(args);

SetUp.Settings(builder);
SetUp.Services(builder);

var app = SetUp.App(builder);
app.Run();