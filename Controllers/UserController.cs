using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using mst.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;
using mst.ViewModels;

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
        public async Task<IActionResult> Create([FromForm] ExtendedUser newUser)
        {
            
            if (_db.Referees.Where(x => x.Email == newUser.Email).ToList().Count == 0 &&
                _db.Referees.Where(q => q.Login == newUser.Login).ToList().Count == 0)
            {
                var referee = new Referee();
                referee.Login = newUser.Login;
                referee.Email = newUser.Email;

                if (newUser.Avatar != null) {
                    using var contentStream = newUser.Avatar.OpenReadStream();
                    MemoryStream memStream = new MemoryStream();
                    await contentStream.CopyToAsync(memStream);
                    var bytes = memStream.ToArray();
                    referee.Avatar = bytes;
                }

                referee.Bio = newUser.Bio;
                referee.City = newUser.City;
                referee.FullName = newUser.FullName;
                
                var user = new User();
                user.Login = newUser.Login;
                user.Password = newUser.Password;
                referee.User = user;
                await _db.Referees.AddAsync(referee);

                await _db.SaveChangesAsync();
                return Ok(referee.Id);
            }
            return BadRequest("Пользователь с таким логином или email уже существует");
        }



        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromForm] ExtendedUser referee)
        {
            try {
                var r = _db.Referees.Where<Referee>(x => x.Id == referee.Id).Single();
                r.FullName = referee.FullName;
                r.Bio = referee.Bio;
                r.City = referee.City;
                if (referee.Avatar != null) {
                    using var contentStream = referee.Avatar.OpenReadStream();
                    MemoryStream memStream = new MemoryStream();
                    await contentStream.CopyToAsync(memStream);
                    var bytes = memStream.ToArray();
                    r.Avatar = bytes;
                }
                
                _db.Referees.Update(r);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest("Пользователь с указанным Id не найден");
            }
        }

        [HttpPost("Post")]
        public async Task<IActionResult> Delete([FromBody] int id)
        {

            var referee = _db.Find<Referee>(id);
            if (referee != null)
            {
                _db.Remove<Referee>(referee);
                await _db.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Пользователь с указанным id не найден");
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] int id)
        {
            try {
                var referee = _db.Referees.Where(referee => referee.Id == id).Single();
                if (referee == null) {
                    return BadRequest("Пользователь не найден");
                }
                return Ok(referee);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail([FromQuery] string email)
        {
            var referee = _db.Referees
                .Where(referee => referee.Email == email);
            if (referee == null) {
                return BadRequest("Пользователь не найден");
            } 
            return Ok(referee);
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var referees = _db.Referees.Include(x => x.AvailableCompetitions);
            foreach(var r in referees)
            {
                foreach (var a in r.AvailableCompetitions)
                {
                    a.Referee = null;
                    a.Competition = null;
                }
            }
            return Ok(referees);
        }

        [HttpGet("Login")]
        public IActionResult Login([FromQuery]string login, [FromQuery] string password) {
            try {
                var u = _db.Users.Include(x=>x.Referee).Where(x => x.Login == login || x.Referee.Email == login).Single();
                if (u.Password == password) {
 
                    u.Referee.User = null;
                    return Ok(u.Referee);
                }
                else {
                    throw new Exception();
                }
            }
            catch {
                    return BadRequest();
                }
            
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody]UserPassword user) {
            try {
                var u = new User();
                if (user.Login != "") {
                    u = _db.Users.Where(x => x.Login == user.Login).Single();
                }
                else {
                    u = _db.Users.Include(x => x.Referee).Where(x => x.Referee.Email == user.Email).Single();
                }
                if (u.Password == user.OldPassword) {
                    u.Password = user.NewPassword;
                    await _db.SaveChangesAsync();

                    return Ok();
                }
                else {
                    return BadRequest("Пароли не совпадают");
                }
            }
            catch {
                return BadRequest("Неверный id/email пользователя");
            }
        }

        [HttpPost("Block")]
        public async Task<IActionResult> Block([FromBody]BlockedReferee blockedReferee) {
            try {
                _db.Referees.Where(x => x.Id == blockedReferee.RefereeId).Single().BlockedReferees.Add(blockedReferee);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest();
            }
        }

        [HttpGet("AvailableCompetitions")]
        public async Task<IActionResult> AvailableCompetitions([FromQuery]int refereeId)
        {
            var referees = _db.Referees.Include(i => i.AvailableCompetitions).Where(w => w.Id == refereeId);
            foreach(var r in referees)
            {
                foreach(var a in r.AvailableCompetitions)
                {
                    a.Competition = null;
                    a.Referee = null;
                }
            }

            return Ok(referees.SelectMany(s=>s.AvailableCompetitions));
        }
    }
}