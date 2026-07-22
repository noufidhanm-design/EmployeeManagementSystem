using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.Service;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;


        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }
        [HttpGet("GetDepartments")]
        public async Task<IActionResult> GetDepartments()
        {
            var departments = await _departmentService.GetDepartmentsAsync();

            return Ok(departments);
        }

        [HttpPost("AddDepartment")]
        public async Task<IActionResult> AddDepartment([FromBody] Department dto)
        {
            var department = new Department {
                Name=dto.Name,
                Code = dto.Code,
                Head=dto.Head,
                Description=dto.Description,
                IsActive=dto.IsActive
            };
            await _departmentService.AddDepartmentAsync(department);

            return Ok("Department added successfully");

           
        }
    }
}
