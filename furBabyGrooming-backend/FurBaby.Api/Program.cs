using Microsoft.OpenApi.Models;
using FurBaby.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FurBaby.Api", Version = "v1" });
});

// CORS for Angular dev server
const string AngularDevCors = "AngularDevCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(AngularDevCors, policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ---- DB (EF Core + SQL Server) ----
var connStr = builder.Configuration.GetConnectionString("DefaultConnection");

// Fail fast if missing so you don't get confusing runtime errors later.
if (string.IsNullOrWhiteSpace(connStr))
{
    throw new InvalidOperationException(
        "Missing connection string: ConnectionStrings:DefaultConnection. " +
        "Add it to appsettings.Development.json or set it via environment variables."
    );
}

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(connStr);
});

var app = builder.Build();

// Swagger in dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Auto-apply migrations in dev (tracer-bullet convenience)
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// IMPORTANT: don't force https during tracer-bullet dev
// (also prevents "Failed to determine the https port for redirect" warning)
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors(AngularDevCors);

app.MapControllers();

// Simple tracer-bullet endpoint
app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "ok",
        service = "FurBaby.Api",
        utc = DateTime.UtcNow
    });
});

app.Run();
