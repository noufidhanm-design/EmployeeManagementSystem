using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.Service;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly MovieDbContext _context;

        public EmployeeService(MovieDbContext context)
        {
            _context = context;
        }
        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await _context.tbl_Employee.ToListAsync();
        }

        //public List<Employee> GetAllEmployees()
        //{
        //    return _context.tbl_Employee.ToList();
        //}

        //public Employee GetEmployeeById(int id)
        //{
        //    return _context.tbl_Employee.FirstOrDefault(x => x.Id == id);
        //}

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.tbl_Employee
                                 .FirstOrDefaultAsync(x => x.Id == id);
        }


        //public Employee CreateEmployee(Employee employee)
        //{
        //    _context.tbl_Employee.Add(employee);
        //    _context.SaveChanges();
        //    return employee;
        //}

        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            _context.tbl_Employee.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }


        //public Employee UpdateEmployee(int id, Employee employee)
        //{
        //    var existing = _context.tbl_Employee.Find(id);
        //    if (existing == null) return null;

        //    existing.Name = employee.Name;
        //    existing.Email = employee.Email;
        //    existing.Phone = employee.Phone;
        //    existing.Designation = employee.Designation;
        //    existing.Salary = employee.Salary;
        //    existing.IsActive = employee.IsActive;

        //    _context.SaveChanges();
        //    return existing;
        //}

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


        //public bool DeleteEmployee(int id)
        //{
        //    var emp = _context.tbl_Employee.Find(id);
        //    if (emp == null) return false;

        //    _context.tbl_Employee.Remove(emp);
        //    _context.SaveChanges();
        //    return true;
        //}


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
