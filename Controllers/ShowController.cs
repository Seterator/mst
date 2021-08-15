using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mst.Models;
using mst.ViewModels;

namespace mst.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ShowController : ControllerBase {
        private DatabaseContext _db;
        public ShowController(DatabaseContext db) {
            _db = db;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm]ShowFromForm show) {
            if (show.Name == null || show.ShortDescription == null) {
                return BadRequest();
            }
            var s = new Show();
            s.Name = show.Name;
            s.Description = show.Description;
            s.ShortDescription = show.ShortDescription;
            s.VideoLink = show.VideoLink;
            s.WebLink = show.WebLink;
            
            if (show.Image != null) {
                using var contentStream = show.Image.OpenReadStream();
                MemoryStream memStream = new MemoryStream();
                await contentStream.CopyToAsync(memStream);
                var bytes = memStream.ToArray();
                s.Image = bytes;
            }

            _db.Shows.Add(s);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromBody]ShowFromForm show) {
            try {
                var s = _db.Shows.Where(x => x.Id == show.Id).Single();
                s.Name = show.Name;
                s.Description = show.Description;
                s.ShortDescription = show.ShortDescription;
                s.VideoLink = show.VideoLink;
                s.WebLink = show.WebLink;
                
                if (show.Image != null) {
                    using var contentStream = show.Image.OpenReadStream();
                    MemoryStream memStream = new MemoryStream();
                    await contentStream.CopyToAsync(memStream);
                    var bytes = memStream.ToArray();
                    s.Image = bytes;
                }
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromQuery]int Id) {
            try {
                var s = _db.Shows.Where(x => x.Id == Id).Single();
                _db.Remove(s);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery]int Id) {
            try {
                var show = _db.Shows
                    .Include(x => x.ShowNominations)
                    .ThenInclude(sn => sn.Nomination)
                    .Where(c => c.Id == Id).Single();
                
                foreach(var showNomination in show.ShowNominations) {
                    showNomination.Nomination.ShowNominations = null;
                    showNomination.Show = null;
                }

                return Ok(show);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll() {
            try {
                var shows = _db.Shows
                                .Include(x => x.ShowNominations)
                                .ThenInclude(sn => sn.Nomination)
                                .ToList();
                foreach(var show in shows) {
                    foreach(var showNomination in show.ShowNominations) {
                    showNomination.Nomination.ShowNominations = null;
                    showNomination.Show = null;
                    }
                }
                return Ok(shows);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("Estimate")]
        public async Task<IActionResult> Estimate([FromBody]Estimation estimation) {
            try {
                _db.Referees.Where(x => x.Id == estimation.RefereeId).Single().Estimations.Add(estimation);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch(Exception ex) {
                return BadRequest();
            }
        }

        [HttpGet("GetEstimations")]
        public IActionResult GetEstimations([FromQuery]int refereeId, [FromQuery]int showId) {
            try {
                var show = _db.Shows.Include(x => x.Estimations).Where(x => x.Id == showId).Single();
                var estimations = show.Estimations.Where(x => x.RefereeId == refereeId).ToList();
                return Ok(estimations);
            }
            catch {
                return BadRequest();
            }
        }
    }
}