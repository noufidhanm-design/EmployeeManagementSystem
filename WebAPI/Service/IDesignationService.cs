using WebAPI.Entities;
namespace WebAPI.Service
{
    public interface IDesignationService
    {
        Task<List<Designation>> GetDesignationsAsync();
        Task<Designation> AddDesignationAsync(Designation designation);
    }
}
