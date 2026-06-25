namespace WebAPI.Entities
{
    public class Designation
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public string Department { get; set; }

        public string Level { get; set; }

        public bool IsActive { get; set; }

        public string Description { get; set; }
    }
}
