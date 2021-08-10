// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
// using mst.Models;

// namespace mst.Controllers {
//     [ApiController]
//     [Route("[controller]")]
//     public class ShowController : ControllerBase {
//         private DatabaseContext _db;
//         public ShowController(DatabaseContext db) {
//             _db = db;
//         }

//         [HttpPost("Create")]
//         public async Task<IActionResult> Create([FromQuery]Show show) {
//             if (show.Name == null || show.Short_description == null) {
//                 return BadRequest();
//             }
//             var s = new Show();
//             s.Name = show.Name;
//             s.Short_description = show.Short_description;
//             s.Video_link = show.Video_link;
//             s.Web_link = show.Web_link;

//             _db.Shows.Add(s);
//             await _db.SaveChangesAsync();
//             return Ok();
//         }

//         [HttpPost("Edit")]
//         public async Task<IActionResult> Edit([FromQuery]Show show) {
//             try {
//                 var s = _db.Shows.Where(x => x.Id == show.Id).Single();
//                 s.Name = show.Name;
//                 s.Short_description = show.Short_description;
//                 s.Video_link = show.Video_link;
//                 s.Web_link = show.Web_link;

//                 await _db.SaveChangesAsync();
//                 return Ok();
//             }
//             catch {
//                 return BadRequest();
//             }
//         }

//         [HttpDelete("Delete")]
//         public async Task<IActionResult> Delete([FromQuery]int Id) {
//             try {
//                 var s = _db.Shows.Where(x => x.Id == Id).Single();
//                 _db.Remove(s);
//                 await _db.SaveChangesAsync();
//                 return Ok();
//             }
//             catch {
//                 return BadRequest();
//             }
//         }

//         [HttpGet("GetById")]
//         public IActionResult GetById([FromQuery]int Id) {
//             try {
//                 var s = _db.Shows.Where(x => x.Id == Id).Single();
//                 return Ok(s);
//             }
//             catch {
//                 return BadRequest();
//             }
//         }

//         [HttpGet("GetAll")]
//         public IActionResult GetAll() {
//             try {
//                 var s = _db.Shows.ToList();
//                 return Ok(s);
//             }
//             catch {
//                 return BadRequest();
//             }
//         }
//     }
// }