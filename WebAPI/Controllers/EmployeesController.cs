using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.Model;
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

        //[HttpGet("{id}")]
        //    public IActionResult GetEmployeeById(int Id)
        //    {
        //        BaseResponseModel response = new BaseResponseModel();
        //        try
        //        {
        //           var employee = _context.tbl_Employee.Where(x => x.Id == Id).FirstOrDefault();
        //            if (employee == null)
        //            {
        //                response.Status = false;
        //                response.Message = "Employee not found.";
        //                return BadRequest(response);
        //            }
        //            response.Status = true;
        //            response.Message = "Employee fetched successfully.";
        //            response.Data = employee;
        //            return Ok(response);
        //        }
        //        catch (Exception ex)
        //        {
        //            response.Status = false;
        //            response.Message = ex.Message;
        //            return BadRequest(response);
        //        }
        //    }



        ////[HttpGet("{id}")]
        ////public IActionResult GetEmployeeById(int id)
        ////{
        ////    var employee = _employeeService.GetEmployeeById(id);

        ////    if (employee == null)
        ////    {
        ////        return NotFound(new BaseResponseModel
        ////        {
        ////            Status = false,
        ////            Message = "Employee not found"
        ////        });
        ////    }

        ////    return Ok(new BaseResponseModel
        ////    {
        ////        Status = true,
        ////        Message = "Employee fetched successfully",
        ////        Data = employee
        ////    });
        ////}

        //[HttpPost]
        //public IActionResult Post([FromBody] CreateEmployeeViewModel model)
        //{
        //    BaseResponseModel response = new BaseResponseModel();
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            var postedmodel = new Employee()
        //            {
        //                Name = model.Name,
        //                Email = model.Email,
        //                Phone = model.Phone,
        //                Designation = model.Designation,
        //                Salary = model.Salary,
        //                IsActive = model.IsActive
        //            };
        //            _context.tbl_Employee.Add(postedmodel);
        //            _context.SaveChanges();
        //            response.Status = true;
        //            response.Message = "Employee created successfully.";
        //            response.Data = model;
        //            return Ok(response);
        //        }
        //        else
        //        {
        //            response.Status = false;
        //            response.Message = "Invalid data.";
        //            return BadRequest(response);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Status = false;
        //        response.Message = ex.Message;
        //        return BadRequest(response);
        //    }
        //}


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
        public async Task<IActionResult> Post([FromBody] CreateEmployeeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new BaseResponseModel
                {
                    Status = false,
                    Message = "Invalid data"
                });
            }

            var employee = new Employee
            {
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Designation = model.Designation,
                Salary = model.Salary,
                IsActive = model.IsActive
            };

            var created = await _employeeService.CreateEmployeeAsync(employee);

            return Ok(new BaseResponseModel
            {
                Status = true,
                Message = "Employee created successfully",
                Data = created
            });
        }



        //[HttpPost]
        //public IActionResult Post([FromBody] CreateEmployeeViewModel model)
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
        //        Name = model.Name,
        //        Email = model.Email,
        //        Phone = model.Phone,
        //        Designation = model.Designation,
        //        Salary = model.Salary,
        //        IsActive = model.IsActive
        //    };

        //    var created = _employeeService.CreateEmployee(employee);

        //    return Ok(new BaseResponseModel
        //    {
        //        Status = true,
        //        Message = "Employee created successfully",
        //        Data = created
        //    });
        //}

        //without service layer
        //[HttpGet]
        //public IActionResult GetAllEmployees()
        //{
        //    BaseResponseModel response = new BaseResponseModel();
        //    try
        //    {
        //        var employees = _context.tbl_Employee.ToList();

        //        response.Status = true;
        //        response.Message = "Employees fetched successfully.";
        //        response.Data = employees;

        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Status = false;
        //        response.Message = ex.Message;
        //        return BadRequest(response);
        //    }
        //}

        //without async
        ////[HttpGet]
        ////public IActionResult GetAllEmployees()
        ////{
        ////    var employees = _employeeService.GetAllEmployees();

        ////    return Ok(new BaseResponseModel
        ////    {
        ////        Status = true,
        ////        Message = "Employees fetched successfully",
        ////        Data = employees
        ////    });
        ////}
        ///
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

        ////[HttpPut("{id}")]
        ////public IActionResult UpdateEmployee(int id, Employee emp)
        ////{
        ////    var updated = _employeeService.UpdateEmployee(id, emp);

        ////    if (updated == null)
        ////    {
        ////        return NotFound(new BaseResponseModel
        ////        {
        ////            Status = false,
        ////            Message = "Employee not found"
        ////        });
        ////    }

        ////    return Ok(new BaseResponseModel
        ////    {
        ////        Status = true,
        ////        Message = "Employee updated successfully",
        ////        Data = updated
        ////    });
        ////}


        //[HttpGet("search")]
        //public IActionResult SearchEmployees(string? name, string? email)
        //{
        //    BaseResponseModel response = new BaseResponseModel();

        //    try
        //    {
        //        var query = _context.tbl_Employee.AsQueryable();

        //        //if (!string.IsNullOrWhiteSpace(name))
        //        //{
        //        //    query = query.Where(x => x.Name.Contains(name));
        //        //}

        //        //if (!string.IsNullOrWhiteSpace(email))
        //        //{
        //        //    query = query.Where(x => x.Email.Contains(email));
        //        //}

        //        if (!string.IsNullOrWhiteSpace(name) || !string.IsNullOrWhiteSpace(email))
        //        {
        //            query = query.Where(x =>
        //                (!string.IsNullOrWhiteSpace(name) && x.Name.Contains(name)) ||
        //                (!string.IsNullOrWhiteSpace(email) && x.Email.Contains(email))
        //            );
        //        }


        //        var employees = query.ToList();

        //        response.Status = true;
        //        response.Message = "Employees fetched successfully.";
        //        response.Data = employees;

        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Status = false;
        //        response.Message = ex.Message;
        //        return BadRequest(response);
        //    }
        //}

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


        ////[HttpDelete("{id}")]
        ////public IActionResult DeleteEmployee(int id)
        ////{
        ////    var deleted = _employeeService.DeleteEmployee(id);

        ////    if (!deleted)
        ////    {
        ////        return NotFound(new BaseResponseModel
        ////        {
        ////            Status = false,
        ////            Message = "Employee not found"
        ////        });
        ////    }

        ////    return Ok(new BaseResponseModel
        ////    {
        ////        Status = true,
        ////        Message = "Employee deleted successfully"
        ////    });
        ////}


        //[HttpPut("{id}")]
        //public IActionResult UpdateEmployee(int id, Employee emp)
        //{
        //    var existing = _context.tbl_Employee.Find(id);
        //    if (existing == null) return NotFound();

        //    existing.Name = emp.Name;
        //    existing.Email = emp.Email;
        //    existing.Phone = emp.Phone;
        //    existing.Designation = emp.Designation;
        //    existing.Salary = emp.Salary;
        //    existing.IsActive = emp.IsActive;

        //    _context.SaveChanges();

        //    return Ok(new BaseResponseModel { Status = true });
        //}


        //[HttpDelete("{id}")]
        //public IActionResult DeleteEmployee(int id)
        //{
        //    var emp = _context.tbl_Employee.Find(id);
        //    if (emp == null)
        //        return NotFound(new BaseResponseModel { Status = false, Message = "Employee not found" });

        //    _context.tbl_Employee.Remove(emp);
        //    _context.SaveChanges();

        //    return Ok(new BaseResponseModel { Status = true, Message = "Employee deleted successfully" });
        //}



    }
}