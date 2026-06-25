using WebAPI.Entities;

namespace WebAPI.Service
{
    public interface IEmployeeService
    {
        //List<Employee> GetAllEmployees();

        Task<List<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> CreateEmployeeAsync(Employee employee);
        Task<Employee> UpdateEmployeeAsync(int id, Employee employee);
        Task<bool> DeleteEmployeeAsync(int id);


        //Employee GetEmployeeById(int id);
        //Employee CreateEmployee(Employee employee);
        //Employee UpdateEmployee(int id, Employee employee);
        //bool DeleteEmployee(int id);
    }
}

