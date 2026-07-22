using WebAPI.Entities;

namespace WebAPI.Service
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetDepartmentsAsync();

        Task<Department> AddDepartmentAsync(Department department);
    }
}
