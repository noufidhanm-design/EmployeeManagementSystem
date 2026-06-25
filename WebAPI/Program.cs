////using Microsoft.EntityFrameworkCore;
////using WebAPI.Data;

////var builder = WebApplication.CreateBuilder(args);

////// Add services to the container.
////builder.Services.AddControllers();

////// Add Swagger
////builder.Services.AddEndpointsApiExplorer();
////builder.Services.AddSwaggerGen();

////// Add DbContext
////builder.Services.AddDbContext<MovieDbContext>(options =>
////    options.UseSqlServer(builder.Configuration.GetConnectionString("MoviePortal"))
////);

////builder.Services.AddCors(options =>
////{
////    options.AddPolicy("AllowReact",
////        policy => policy
////            .AllowAnyOrigin()      // allow localhost:3004
////            .AllowAnyHeader()
////            .AllowAnyMethod());
////});

////var app = builder.Build();

////app.UseCors("AllowReact"); // must come BEFORE UseAuthorization
////app.UseAuthorization();
////app.MapControllers();
////app.Run();

////////////using Microsoft.EntityFrameworkCore;
////////////using WebAPI.Data;
////////////var builder = WebApplication.CreateBuilder(args);
//////////// builder.Services.AddControllers();
//////////// builder.Services.AddEndpointsApiExplorer();
////////////builder.Services.AddSwaggerGen();
////////////builder.Services.AddDbContext<MovieDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MoviePortal"))); var app = builder.Build();
//////////// if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
////////////app.UseHttpsRedirection(); 
////////////app.UseAuthorization();
////////////app.MapControllers(); app.Run();
/////

//using Microsoft.EntityFrameworkCore;
//using WebAPI.Data;

//var builder = WebApplication.CreateBuilder(args);

//// ------------------ Services ------------------

//// Controllers
//builder.Services.AddControllers();

//// Swagger
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// DbContext
//builder.Services.AddDbContext<MovieDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("MoviePortal"))
//);

//// ✅ CORS (IMPORTANT)
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowReact",
//        policy =>
//        {
//            policy
//                .WithOrigins("http://localhost:3000", "http://localhost:3007")
//                .AllowAnyHeader()
//                .AllowAnyMethod();
//        });
//});


//// ------------------ Build App ------------------
//var app = builder.Build();

//// ------------------ Middleware ------------------

//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//// ✅ CORS MUST be BEFORE Authorization
//app.UseCors("AllowReact");

//app.UseAuthorization();

//app.MapControllers();

//app.Run();

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


// DbContext (optional, can skip if testing without DB)
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MoviePortal"))
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

app.UseHttpsRedirection();
app.UseCors("AllowReact"); // Must be before Authorization
app.UseAuthorization();
app.MapControllers();
app.Run();

