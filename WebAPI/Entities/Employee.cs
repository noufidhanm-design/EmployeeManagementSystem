using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string Designation { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,3)")]
        public decimal Salary { get; set; }
        public bool IsActive { get; set; }
    }
}
