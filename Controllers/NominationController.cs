using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using mst.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace mst.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NominationController : ControllerBase
    {
        private DatabaseContext _db;
        public NominationController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] Nomination nomination)
        {
            try {
                if (nomination.Name == null) {
                    return BadRequest("Не указано название номинации");
                }
                var nom = new Nomination();
                nom.Name = nomination.Name;
                nom.CompetitionId = nomination.CompetitionId;
                nom.Competition = _db.Competitions.Where(x => x.Id == nomination.CompetitionId).Single();

                await _db.Nominations.AddAsync(nom);
                await _db.SaveChangesAsync();

                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromBody] Nomination nomination)
        {
            try {
                var nom = _db.Nominations.Where(c => c.Id == nomination.Id).Single();
                nom.Name = nomination.Name;

                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            try {
                var nom = _db.Nominations.Where(c => c.Id == id).Single();
                _db.Nominations.Remove(nom);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] int id)
        {
            try {
                var nom = _db.Nominations.Where(c => c.Id == id).Single();
                var sns = _db.ShowNominations.Where(x => x.NominationId == id).ToList();
                var shows = new List<Show>();
                foreach (var i in sns) {
                    var q = _db.Shows.Where(x =>  i.ShowId == x.Id);
                    var s = q.Single();
                    // shows.Add(
                    //     s
                    // );
                }
                nom.Shows = shows;
                return Ok(nom);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try {
                var noms = _db.Nominations.ToList();
                return Ok(noms);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("AddShow")]
        public async Task<IActionResult> AddShow([FromBody]ShowNomination showNomination) {
            try {
                if (
                    _db.Shows.Where(x => x.Id == showNomination.ShowId).ToList().Count == 0 ||
                    _db.Nominations.Where(x => x.Id == showNomination.NominationId).ToList().Count == 0
                ) {
                    throw new Exception();
                }
                await _db.AddAsync(showNomination);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }
    }
}