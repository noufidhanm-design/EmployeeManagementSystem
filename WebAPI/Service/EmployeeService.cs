using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.Service;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly HrmsDbContext _context;

        public EmployeeService(HrmsDbContext context)
        {
            _context = context;
        }

        public async Task<string> GetNextEmployeeId()
        {
            using (var connection = _context.Database.GetDbConnection())
            {
                await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "sp_GetNextEmployeeId";
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    var result = await command.ExecuteScalarAsync();

                    return result?.ToString();
                }
            }
        }

        public async Task<List<object>> GetAllEmployeesAsync()
        {
            var employees = await
                (from e in _context.tbl_Employee

                 join d in _context.tbl_Designations
                 on e.Designation equals d.Code
                 into designationGroup

                 from d in designationGroup.DefaultIfEmpty()

                 join b in _context.tbl_Department
          on e.Department equals b.Code
          into departmentGroup

                 from b in departmentGroup.DefaultIfEmpty()

                 select new
                 {
                     e.Id,
                     e.Name,
                     e.Email,
                     e.Phone,

                     Designation = d != null ? d.Name : "",

                    Department=b!=null?b.Name:"",
                     e.Salary,
                     e.Allowance,
                     e.IsActive,
                     e.profilePhotoFile,

                     ProfilePhotoUrl = e.profilePhotoFile != null
                         ? "/uploads/" + e.profilePhotoFile
                         : null
                 })
                .ToListAsync();

            return employees.Cast<object>().ToList();
        }



        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.tbl_Employee
                                 .FirstOrDefaultAsync(x => x.Id == id);
        }


     
        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            _context.tbl_Employee.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }


   

        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            var existing = await _context.tbl_Employee.FindAsync(id);
            if (existing == null) return null;

            existing.Name = employee.Name;
            existing.Email = employee.Email;
            existing.Phone = employee.Phone;
            existing.Designation = employee.Designation;
            existing.Salary = employee.Salary;
            existing.IsActive = employee.IsActive;

            await _context.SaveChangesAsync();
            return existing;
        }


     


        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var emp = await _context.tbl_Employee.FindAsync(id);
            if (emp == null) return false;

            _context.tbl_Employee.Remove(emp);
            await _context.SaveChangesAsync();
            return true;
        }


     

    }
}
