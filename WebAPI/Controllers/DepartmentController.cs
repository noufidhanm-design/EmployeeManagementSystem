using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly HrmsDbContext _context;
        public DepartmentController(HrmsDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetDepartments")]
        public async Task<IActionResult> GetDepartments()
        {
            var departments = await _context.tbl_Department.ToListAsync();
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
            await _context.tbl_Department.AddAsync(department);
            await _context.SaveChangesAsync();

            return Ok("Department added successfully");

           
        }
    }
}
