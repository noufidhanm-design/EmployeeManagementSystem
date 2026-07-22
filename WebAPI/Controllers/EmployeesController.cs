using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.Model;
using Microsoft.AspNetCore.Http;
using WebAPI.Service;
namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
       
private readonly IEmployeeService _employeeService;

    public EmployeesController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }
       
        [HttpGet("next-id")]
        public async Task<IActionResult> GetNextEmployeeId()
        {
            var id = await _employeeService.GetNextEmployeeId();

            return Ok(new
            {
                employeeId = id
            });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);

            if (employee == null)
            {
                return NotFound(new BaseResponseModel
                {
                    Status = false,
                    Message = "Employee not found"
                });
            }

            return Ok(new BaseResponseModel
            {
                Status = true,
                Message = "Employee fetched successfully",
                Data = employee
            });
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] CreateEmployeeViewModel model)
        {
            if (model == null)
                return BadRequest("Model is null");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // ✅ SAFE ENUM PARSING
            if (!Enum.TryParse<Gender>(model.Gender, true, out var gender))
                return BadRequest("Invalid Gender");

            if (!Enum.TryParse<MaritalStatus>(model.MaritalStatus, true, out var marital))
                return BadRequest("Invalid MaritalStatus");

            var employee = new Employee
            {
                EmpId = model.EmpId,
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Designation = model.Designation,
                Department = model.Department,

                Salary = model.Salary ?? 0,
                Allowance = model.Allowance ?? 0,

                IsActive = model.IsActive,

                DOB = model.DOB ?? DateTime.Now,
                JoinDate = model.JoinDate ?? DateTime.Now,

                Gender = gender,
                MaritalStatus = marital,

                Nationality = model.Nationality,
                Address = model.Address
            };

            // ✅ FILE SAVE
            if (model.ProfilePhotoFile != null && model.ProfilePhotoFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads");

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var extension = Path.GetExtension(model.ProfilePhotoFile.FileName);

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };

                if (!allowedExtensions.Contains(extension.ToLower()))
                {
                    return BadRequest("Only JPG, JPEG, PNG allowed");
                }

                var fileName = Guid.NewGuid() + extension;

                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.ProfilePhotoFile.CopyToAsync(stream);
                }

                employee.profilePhotoFile = fileName;
            }

            var created = await _employeeService.CreateEmployeeAsync(employee);

            return Ok(new BaseResponseModel
            {
                Status = true,
                Message = "Employee created successfully",
                Data = created
            });
        }

        //[HttpPost]
        //public async Task<IActionResult> Post([FromForm] CreateEmployeeViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(new BaseResponseModel
        //        {
        //            Status = false,
        //            Message = "Invalid data"
        //        });
        //    }


        //    var employee = new Employee
        //    {
        //        EmpId = model.EmpId,
        //        Name = model.Name,
        //        Email = model.Email,
        //        Phone = model.Phone,
        //        Designation = model.Designation,
        //        Department = model.Department,

        //        Salary = model.Salary ?? 0,
        //        Allowance = model.Allowance ?? 0,

        //        IsActive = model.IsActive,

        //        DOB = model.DOB ?? DateTime.Now,
        //        JoinDate = model.JoinDate ?? DateTime.Now,

        //        Gender = Enum.Parse<Gender>(model.Gender),
        //        MaritalStatus = Enum.Parse<MaritalStatus>(model.MaritalStatus),

        //        Nationality = model.Nationality,
        //        Address = model.Address,
        //        profilePhotoFile = model.profilePhotoFile
        //    };


        //    var created = await _employeeService.CreateEmployeeAsync(employee);

        //    return Ok(new BaseResponseModel
        //    {
        //        Status = true,
        //        Message = "Employee created successfully",
        //        Data = created
        //    });
        //}


        //[HttpGet]
        //public async Task<IActionResult> GetAllEmployees()
        //{
        //    var employees = await _employeeService.GetAllEmployeesAsync();

        //    return Ok(new BaseResponseModel
        //    {
        //        Status = true,
        //        Message = "Employees fetched successfully",
        //        Data = employees
        //    });
        //}
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeService.GetAllEmployeesAsync();

           
            return Ok(new BaseResponseModel
            {
                Status = true,
                Message = "Employees fetched successfully",
                Data = employees
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee emp)
        {
            var updated = await _employeeService.UpdateEmployeeAsync(id, emp);

            if (updated == null)
            {
                return NotFound(new BaseResponseModel
                {
                    Status = false,
                    Message = "Employee not found"
                });
            }

            return Ok(new BaseResponseModel
            {
                Status = true,
                Message = "Employee updated successfully",
                Data = updated
            });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var deleted = await _employeeService.DeleteEmployeeAsync(id);

            if (!deleted)
            {
                return NotFound(new BaseResponseModel
                {
                    Status = false,
                    Message = "Employee not found"
                });
            }

            return Ok(new BaseResponseModel
            {
                Status = true,
                Message = "Employee deleted successfully"
            });
        }



    }
}