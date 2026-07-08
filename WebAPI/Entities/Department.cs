using System.ComponentModel.DataAnnotations;

namespace WebAPI.Entities
{
    public class Department
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Head { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
