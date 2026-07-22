using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebAPI.Data;

using WebAPI.Entities;
using WebAPI.Model;
using WebAPI.Service;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class DesignationController : ControllerBase
    {
        private readonly IDesignationService _designationService;

        public DesignationController(IDesignationService designationService)
        {
            _designationService = designationService;
        }
        [HttpGet("GetDesignation")]
        public async Task<IActionResult> GetDesignations()
        {
            //var designations = await (from d in _designationService.tbl_Designations
            //                          join dep in _designationService.tbl_Department
            //                          on d.Department equals dep.Code
            //                          select new Designation
            //                          {
            //                              Id = d.Id,
            //                              Name = d.Name,
            //                              Code = d.Code,
            //                              Department = dep.Name,

            //                              Level = d.Level,
            //                              IsActive = d.IsActive
            //                          }).ToListAsync();
            var designations = await _designationService.GetDesignationsAsync();

            return Ok(designations);
        }

        [HttpPost("AddDesignation")]
        public async Task<IActionResult> AddDesignation([FromBody] Designation dto)
        {

            var designation = new Designation
            {
                Name = dto.Name,
                Code = dto.Code,
                Department = dto.Department,
                Level = dto.Level,
                IsActive = dto.IsActive,
                Description = dto.Description
            };

          
            await _designationService.AddDesignationAsync(designation);

            return Ok("Designation added successfully");
        }
    }
}
