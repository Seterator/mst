using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using mst.Models;
using System.Linq;
using System.Threading.Tasks;

namespace mst.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private DatabaseContext _db;
        public UserController(DatabaseContext db)
        {
            _db = db;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromQuery] Referee referee)
        {
            if (_db.Referees.Where(x => x.Email == referee.Email).ToList().Count == 0)
            {
                await _db.Referees.AddAsync(referee);
                await _db.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Пользователь с таким email уже существует");
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromQuery] Referee referee)
        {
            try {
                var r = _db.Referees.Where<Referee>(x => x.Id == referee.Id).Single();
                r.FullName = referee.FullName;
                r.Bio = referee.Bio;
                r.City = referee.City;
                r.Avatar = referee.Avatar;
                r.Email = referee.Email;
                _db.Referees.Update(r);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest("Пользователь с указанным Id не найден");
            }
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromQuery] int user_id)
        {

            var r = _db.Find<Referee>(user_id);
            if (r != null)
            {
                _db.Remove<Referee>(r);
                await _db.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Пользователь с указанным id не найден");
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] int user_id)
        {
            var referee = _db.Referees.Where(referee => referee.Id == user_id);
            if (referee == null) {
                return BadRequest("Пользователь не найден");
            }
            return Ok(referee);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail([FromQuery] string email)
        {
            var referee = _db.Referees.Where(referee => referee.Email == email);
            if (referee == null) {
                return BadRequest("Пользователь не найден");
            }
            return Ok(referee);
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_db.Referees);
        }
    }
}