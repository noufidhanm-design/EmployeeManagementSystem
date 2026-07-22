using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Service
{
    public class DepartmentService : IDepartmentService
    {
        private readonly HrmsDbContext _context;

        public DepartmentService(HrmsDbContext context)
        {
            _context = context;
        }
        public async Task<List<Department>> GetDepartmentsAsync()
        {
            return await _context.tbl_Department
                                 .ToListAsync();
        }


        public async Task<Department> AddDepartmentAsync(Department department)
        {
            await _context.tbl_Department.AddAsync(department);

            await _context.SaveChangesAsync();

            return department;
        }

    }
}
