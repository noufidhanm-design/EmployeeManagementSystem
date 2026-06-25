using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MovieDbContext _context;

        public MovieController(MovieDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetMoviewById(int Id)
        {
            BaseResponseModel response = new BaseResponseModel();

            try
            {
                var movieCount = _context.Movie.Count();
                var movie = _context.Movie.Include(x => x.Actors).Where(x => x.Id == Id).FirstOrDefault();
                if (movie == null)
                {
                    response.Status = false;
                    response.Message = "Movie not found.";
                    return BadRequest(response);
                }
                response.Status = true;
                response.Message= "Movie list fetched successfully.";
                response.Data = movie;

                return Ok(response);
            }
            catch (Exception ex)
            {

                response.Status= false;
                response.Message= ex.Message;
                return BadRequest(response);
            }
         
        }
        [HttpPost]
        public IActionResult Post([FromBody] CreateMovieViewModel model)
        {
            Console.WriteLine("POST HIT");
            BaseResponseModel response = new BaseResponseModel();

            try
            {
                if(ModelState.IsValid)
                {
                  
                    //fetch actors from person table based on model.Actors ids
                    var actors = _context.Person.Where(x => model.Actors.Contains(x.Id)).ToList();
                    //if(actors.Count != model.Actors.Count)
                    //{
                    //    response.Status = false;
                    //    response.Message = "One or more actors not found.";
                    //    return BadRequest(response);
                    //}
                    var postedmodel=new Movies()
                    {
                        Title = model.Title,
                        Description = model.Description,
                        Language = model.Language,
                        ReleaseDate = model.ReleaseDate,
                        CoverImage = model.CoverImage,
                        Actors = actors
                    };
                    _context.Movie.Add(postedmodel);
                    _context.SaveChanges();
                    response.Status = true;
                    response.Message = "Movie created successfully.";
                    response.Data = postedmodel;
                    return Ok(response);
                }
                else
                {
                    response.Status = false;
                    response.Message = "Invalid model.";
                    response.Data = ModelState;
                    return BadRequest(response);
                }
            }
            catch(Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
                return BadRequest(response);

            }

            }


   
    }
}



//[HttpPut]
//public IActionResult Put(CreateMovieViewModel model)
//{
//    BaseResponseModel response = new BaseResponseModel();

//    try
//    {
//        if (ModelState.IsValid)
//        {
//            if (model.Id <= 0)
//            {
//                response.Status = false;
//                response.Message = "Invalid movie id.";
//                return BadRequest(response);
//            }
//            //fetch actors from person table based on model.Actors ids
//            var actors = _context.Person.Where(x => model.Actors.Contains(x.Id)).ToList();
//            if (actors.Count != model.Actors.Count)
//            {
//                response.Status = false;
//                response.Message = "One or more actors not found.";
//                return BadRequest(response);
//            }
//            //check if movie exists
//            var moviedetail = _context.Movie.Include(x => x.Actors).Where(x => x.Id == model.Id).FirstOrDefault();
//            if (moviedetail == null)
//            {
//                response.Status = false;
//                response.Message = "Movie not found.";
//                return BadRequest(response);
//            }
//            moviedetail.CoverImage = model.CoverImage;
//            moviedetail.Description = model.Description;
//            moviedetail.Language = model.Language;
//            moviedetail.ReleaseDate = model.ReleaseDate;
//            moviedetail.Title = model.Title;
//            //find actors to be removed
//            var actorsToRemove = moviedetail.Actors.Where(a => !model.Actors.Contains(a.Id)).ToList();
//            foreach (var actor in actorsToRemove)
//            {
//                moviedetail.Actors.Remove(actor);
//            }
//            //find actors to be added
//            var addedactors = actors.Except(moviedetail.Actors).ToList();
//            foreach (var actor in addedactors)
//            {
//                moviedetail.Actors.Add(actor);
//            }
//            _context.Movie.Update(moviedetail);


//            _context.SaveChanges();
//            response.Status = true;
//            response.Message = "Movie created successfully.";
//            response.Data = moviedetail;
//            return Ok(response);
//        }
//        else
//        {
//            response.Status = false;
//            response.Message = "Invalid model.";
//            response.Data = ModelState;
//            return BadRequest(response);
//        }
//    }
//    catch (Exception ex)
//    {
//        response.Status = false;
//        response.Message = ex.Message;
//        return BadRequest(response);

//    }

//}
