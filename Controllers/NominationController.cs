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

                return Ok(nom.Id);
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
                var nom = _db.Nominations
                    .Include(x => x.ShowNominations)
                    .ThenInclude(sn => sn.Show)
                    .Where(c => c.Id == id).Single();
                
                foreach(var showNomination in nom.ShowNominations) {
                    showNomination.Show.ShowNominations = null;
                    showNomination.Nomination = null;
                }

                return Ok(nom);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                var noms = _db.Nominations
                    .Include(sn => sn.Estimations).AsSplitQuery()
                                .Include(x => x.ShowNominations).AsSplitQuery()
                                .ToList();
                foreach (var nom in noms)
                {
                    foreach (var showNomination in nom.ShowNominations)
                    {


                        showNomination.Nomination = null;

                    }
                    foreach (var estimations in nom.Estimations)
                    {

                        estimations.Nomination = null;
                    }
                }
                return Ok(noms);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("AddShow")]
        public async Task<IActionResult> AddShow([FromBody]IEnumerable<ShowNomination> showNominations, [FromQuery]int competitionId) {
            try {

                var toRemove = _db.Nominations.Where(n=>n.CompetitionId == competitionId).SelectMany(s=>s.ShowNominations);

                if(toRemove.Any())
                {
                    _db.RemoveRange(toRemove);
                }
                
                _db.AddRange(showNominations);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex) {
                return BadRequest();
            }
        }
    }
}