using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mst.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace mst.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class CompetitionController : ControllerBase {
        private DatabaseContext _db;
        public CompetitionController(DatabaseContext db) {
            _db = db;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody]Competition competition) {
            if (competition.Name == null) {
                return BadRequest("Не указано название премии");
            }
            var comp = new Competition();
            comp.Name = competition.Name;
            comp.Link = competition.Link;
            comp.BeginDate = competition.BeginDate;
            comp.EndDate = competition.EndDate;
            comp.Nominations = competition.Nominations;

            await _db.Competitions.AddAsync(comp);
            await _db.SaveChangesAsync();

            return Ok(comp);
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromBody]Competition competition) {
            try {
                var comp = _db.Competitions.Where(c => c.Id == competition.Id).Single();
                comp.Name = competition.Name;
                comp.BeginDate = competition.BeginDate;
                comp.EndDate = competition.EndDate;
                comp.Link= competition.Link;

                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromQuery]int id) {
            try {
                var comp = _db.Competitions.Where(c => c.Id == id).Single();
                _db.Competitions.Remove(comp);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery]int id) {
            try {
                var comp = _db.Competitions.Include(x => x.Nominations).Where(c => c.Id == id).Single();
                foreach (var n in comp.Nominations) {
                    n.Competition = null;
                }
                return Ok(comp);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll() {
            try {
                var comps = _db.Competitions.Include(x => x.Nominations).ToList();
                foreach (var c in comps) {
                    foreach (var n in c.Nominations) {
                        n.Competition = null;
                    }
                }
                return Ok(comps);
            }
            catch {
                return BadRequest();
            }
        } 
    }
} 