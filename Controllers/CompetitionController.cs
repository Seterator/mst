// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
// using mst.Models;
// using System.Linq;

// namespace mst.Controllers {
//     [ApiController]
//     [Route("[controller]")]
//     public class CompetitionController : ControllerBase {
//         private DatabaseContext _db;
//         public CompetitionController(DatabaseContext db) {
//             _db = db;
//         }

//         [HttpPost("Create")]
//         public async Task<IActionResult> Create([FromQuery]Competition competition) {
//             if (competition.Name == null) {
//                 return BadRequest("Пусто название премии");
//             }
//             var comp = new Competition();
//             comp.Name = competition.Name;
//             comp.Begin_date = competition.Begin_date;
//             comp.End_date = competition.End_date;
//             comp.Short_description = competition.Short_description;

//             await _db.Competitions.AddAsync(comp);
//             await _db.SaveChangesAsync();

//             return Ok();
//         }

//         [HttpPost("Edit")]
//         public async Task<IActionResult> Edit([FromQuery]Competition competition) {
//             try {
//                 var comp = _db.Competitions.Where(c => c.Id == competition.Id).Single();
//                 comp.Name = competition.Name;
//                 comp.Begin_date = competition.Begin_date;
//                 comp.End_date = competition.End_date;
//                 comp.Short_description = competition.Short_description;

//                 await _db.SaveChangesAsync();
//                 return Ok();
//             }
//             catch {
//                 return BadRequest();
//             }
//         }

//         [HttpPost("Delete")]
//         public async Task<IActionResult> Delete([FromQuery]int id) {
//             try {
//                 var comp = _db.Competitions.Where(c => c.Id == id).Single();
//                 _db.Competitions.Remove(comp);
//                 await _db.SaveChangesAsync();
//                 return Ok();
//             }
//             catch {
//                 return BadRequest();
//             }
//         }

//         [HttpGet("GetById")]
//         public IActionResult GetById([FromQuery]int id) {
//             try {
//                 var comp = _db.Competitions.Where(c => c.Id == id).Single();
//                 return Ok(comp);
//             }
//             catch {
//                 return BadRequest();
//             }
//         }

//         [HttpGet("GetAll")]
//         public IActionResult GetAll() {
//             try {
//                 var comps = _db.Competitions.ToList();
//                 return Ok(comps);
//             }
//             catch {
//                 return BadRequest();
//             }
//         } 
//     }
// } 