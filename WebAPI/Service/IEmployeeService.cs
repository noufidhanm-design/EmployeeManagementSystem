using WebAPI.Entities;

namespace WebAPI.Service
{
    public interface IEmployeeService
    {
        Task<List<object>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> CreateEmployeeAsync(Employee employee);
        Task<Employee> UpdateEmployeeAsync(int id, Employee employee);
        Task<bool> DeleteEmployeeAsync(int id);
        Task<string> GetNextEmployeeId();
    }
}

