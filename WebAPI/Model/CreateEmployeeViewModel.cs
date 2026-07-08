using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Entities;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Model
{
    public class CreateEmployeeViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name of the Employee is required")]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Designation { get; set; } = string.Empty;

        public decimal? Salary { get; set; }
        public decimal? Allowance { get; set; }

        public bool IsActive { get; set; }

        public DateTime? JoinDate { get; set; }
        public DateTime? DOB { get; set; }

        public string Gender { get; set; } = string.Empty;
        public string MaritalStatus { get; set; } = string.Empty;
        public string Nationality { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string EmpId { get; set; } = string.Empty;

        public IFormFile? ProfilePhotoFile { get; set; }
    }


}