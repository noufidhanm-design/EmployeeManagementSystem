using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } 
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Designation { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,3)")]
        public decimal Salary { get; set; }
        public bool IsActive { get; set; }

        public DateTime JoinDate { get; set; }
        public DateTime DOB { get; set; }
        public Gender Gender { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public string Nationality { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string EmpId { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal Allowance { get; set; }

        public string? profilePhotoFile { get; set; }
    }
    public enum Gender
    {
        Male,
        Female,
        Other
    }

    public enum MaritalStatus
    {
        Single,
        Married,
        Divorced,
        Widowed
    }
}
