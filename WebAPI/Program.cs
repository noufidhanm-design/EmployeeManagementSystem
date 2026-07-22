

using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Service;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//reg services
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IDesignationService, DesignationService>();


// DbContext (optional, can skip if testing without DB)
builder.Services.AddDbContext<HrmsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("EmployeePortal"))
);

// CORS - allow React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins(
                "http://localhost:3000",
                "http://localhost:3008",
                "https://localhost:3000",
                "https://localhost:3008"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//middleware controller
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowReact");

app.UseAuthorization();

app.MapControllers();

app.Run();


