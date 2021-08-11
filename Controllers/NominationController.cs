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
    }
}