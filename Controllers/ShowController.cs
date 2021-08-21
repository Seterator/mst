using System;
using System.Collections.Generic;
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
        public async Task<IActionResult> Edit([FromForm] ShowFromForm show) {
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

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromQuery]int id) {
            try {
                var s = _db.Shows.Where(x => x.Id == id).Single();
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
                    .Where(c => c.Id == Id).AsSplitQuery()
                    .Include(x => x.BlockedReferees).AsSplitQuery()
                    .Include(x => x.ShowNominations)
                    .ThenInclude(sn => sn.Nomination)
                    .ThenInclude(i => i.Estimations).AsSplitQuery()
                    .Select(s =>
                    new {
                        s.BlockedReferees,
                        s.Description,
                        s.Estimations,
                        s.Id,
                        s.Name,
                        s.ShortDescription,
                        s.ShowNominations,
                        s.VideoLink,
                        s.WebLink
                    }).Single();
                    
                
                foreach(var showNomination in show.ShowNominations) {
                    showNomination.Nomination.ShowNominations = null;
                    showNomination.Show = null;

                    foreach(var e in showNomination.Nomination.Estimations)
                    {
                        e.Nomination = null;
                        e.Show = null;
                    }
                }
                foreach(var b in show.BlockedReferees)
                {
                    b.Referee = null;
                    b.Show = null;
                }

                return Ok(show);
            }
            catch (Exception ex){
                return BadRequest();
            }
        }

        [HttpGet("GetImage")]
        public IActionResult GetShowImage([FromQuery] int showId)
        {
            var res = _db.Shows.Single(s => s.Id == showId).Image;
            return Ok(res);
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] bool onlyShow = true) {
            try {
                if (onlyShow)
                {
                    return Ok(_db.Shows.Select(s=> 
                    new { 
                        s.BlockedReferees,
                        s.Description, 
                        s.Estimations, 
                        s.Id, 
                        s.Name,
                        s.ShortDescription, 
                        s.ShowNominations,
                        s.VideoLink, 
                        s.WebLink}).ToList());
                }
                else
                {
                    var shows = _db.Shows
                                    .Include(x => x.ShowNominations)
                                    .ThenInclude(n=>n.Nomination).AsSplitQuery()
                                    .Include(b => b.BlockedReferees).AsSplitQuery()
                                    .Include(sn => sn.Estimations).AsSplitQuery()
                                    .Select(s => new {
                                        s.BlockedReferees,
                                        s.Description,
                                        s.Estimations,
                                        s.Id,
                                        s.Name,
                                        s.ShortDescription,
                                        s.ShowNominations,
                                        s.VideoLink,
                                        s.WebLink
                                    })
                                    .ToList();
                    foreach (var show in shows)
                    {
                        foreach (var showNomination in show.ShowNominations)
                        {
                            showNomination.Show = null;
                            showNomination.Nomination.ShowNominations = null;

                        }
                        foreach (var estimation in show.Estimations)
                        {
                            estimation.Nomination = null;
                            estimation.Show = null;
                        }
                        foreach (var bl in show.BlockedReferees)
                        {
                            bl.Referee = null;
                            bl.Show = null;
                        }

                    }
                    return Ok(shows);
                }
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("Estimate")]
        public async Task<IActionResult> Estimate([FromBody]Estimation estimation) {
            try {
                var estimations = _db.Referees.Include(i=>i.Estimations).Single(x => x.Id == estimation.RefereeId).Estimations;
                var toDel = estimations.FirstOrDefault(a => a.NominationId == estimation.NominationId && a.Score == estimation.Score);
                if (toDel != null)
                {
                    _db.Remove(toDel);
                }


                var curEstimate = estimations.FirstOrDefault(a => a.NominationId == estimation.NominationId && a.ShowId == estimation.ShowId);

                if(curEstimate == null)
                {
                    estimations.Add(estimation);
                }
                else
                {
                    curEstimate.Score = estimation.Score;
                    _db.Update(curEstimate);
                }
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
                var show = _db.Shows
                    .Include(x => x.Estimations).AsSplitQuery()
                    .Where(x => x.Id == showId)
                    .Select(s => new {
                        s.BlockedReferees,
                        s.Description,
                        s.Estimations,
                        s.Id,
                        s.Name,
                        s.ShortDescription,
                        s.ShowNominations,
                        s.VideoLink,
                        s.WebLink
                    })
                    .Single();
                var estimations = show.Estimations.Where(x => x.RefereeId == refereeId).ToList();
                
                return Ok(estimations.Select(s=> new {s.ShowId, s.NominationId, s.RefereeId, s.Score }));
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("DeleteEstimation")]
        public async Task<IActionResult> EditEstimation([FromBody]Estimation estimation) {
            try {
                var curEstimate = _db.Referees.Include(x => x.Estimations)
                    .Single(x => x.Id == estimation.RefereeId)
                    .Estimations
                    .FirstOrDefault(a => a.NominationId == estimation.NominationId && a.ShowId == estimation.ShowId);

                if(curEstimate != null)
                {
                    _db.Remove(curEstimate);
                }
                
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost("BlockReferee")]
        public async Task<IActionResult> BlockReferee([FromBody] IEnumerable<BlockedReferee> blockedReferees, [FromQuery]int showId)
        {
            try
            {
                var blocked = _db.Shows.Include(b => b.BlockedReferees).Single(s => s.Id == showId).BlockedReferees;

                _db.RemoveRange(blocked);
                _db.AddRange(blockedReferees);
                await _db.SaveChangesAsync();

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        public async Task<IActionResult> ShowRefereeWatched([FromBody] ShowReferee showReferee)
        {
            try
            {
                if (!_db.ShowReferees.Any(a => a.ShowId == showReferee.ShowId && a.RefereeId == showReferee.RefereeId))
                {

                    await _db.AddAsync(showReferee);
                    await _db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
    }
   

 }