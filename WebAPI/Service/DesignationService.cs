using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Service
{
    public class DesignationService: IDesignationService
    {
        private readonly HrmsDbContext _context;
        public DesignationService(HrmsDbContext context)
        {
            _context = context;
        }
        public async Task<List<Designation>> GetDesignationsAsync()
        {
            var designations = await
                (from d in _context.tbl_Designations

                 join dep in _context.tbl_Department
                 on d.Department equals dep.Code
                 into departmentGroup

                 from dep in departmentGroup.DefaultIfEmpty()

                 select new Designation
                 {
                     Id = d.Id,
                     Name = d.Name,
                     Code = d.Code,

                     Department = dep != null ? dep.Name : "",

                     Level = d.Level,
                     IsActive = d.IsActive,
                     Description = d.Description
                 })
                .ToListAsync();


            return designations;
        }
        public async Task<Designation> AddDesignationAsync(Designation designation)
        {
            _context.tbl_Designations.Add(designation);
            await _context.SaveChangesAsync();
            return designation;
        }
    }
}
