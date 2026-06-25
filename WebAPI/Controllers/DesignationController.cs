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
        private readonly MovieDbContext _context;

        public DesignationController(MovieDbContext context)
        {
            _context = context;
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

            await _context.tbl_Designations.AddAsync(designation);
            await _context.SaveChangesAsync();

            return Ok("Designation added successfully");
        }
    }
}
