using System;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Data
{
    public class HrmsDbContext : DbContext
    {
        public HrmsDbContext(DbContextOptions<HrmsDbContext> options):base(options)
        {

            
        }
        public DbSet<Employee> tbl_Employee { get; set; }
        public DbSet<Designation> tbl_Designations { get; set; }
        public DbSet<Department>tbl_Department { get; set; }



        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           base.OnModelCreating(modelBuilder);
        }



    }
}
