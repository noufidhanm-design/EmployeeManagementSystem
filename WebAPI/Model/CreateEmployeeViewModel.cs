using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Entities;

namespace WebAPI.Model
{
    public class CreateEmployeeViewModel
    {

        public int Id { get; set; }
        [Required(ErrorMessage ="Name of the Employee is required")]
        public string Name { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Designation { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,3)")]
        public decimal Salary { get; set; }
        public bool IsActive { get; set; }
    }
}
