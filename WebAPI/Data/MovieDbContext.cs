using System;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Data
{
    public class MovieDbContext:DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext>options):base(options)
        {

            
        }
        public DbSet<Movies> Movie { get; set; }
        public DbSet<Person> Person { get; set; }
        public DbSet<Employee> tbl_Employee { get; set; }
        public DbSet<Designation> tbl_Designations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           base.OnModelCreating(modelBuilder);
        }

    }
}
