using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using mst.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

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
            
            if (_db.Referees.Where(x => x.Email == newUser.Email).ToList().Count == 0 ||
                _db.Referees.Where(q => q.Login == newUser.Login).ToList().Count == 0)
            {
                var referee = new Referee();
                referee.Login = newUser.Login;
                referee.Email = newUser.Email;


                //referee.Avatar = newUser.Avatar;


                //using var contentStream = newUser.File.OpenReadStream();


                referee.Bio = newUser.Bio;
                referee.City = newUser.City;
                referee.FullName = newUser.FullName;
                
                var user = new User();
                user.Login = newUser.Login;
                user.Password = newUser.Password;
                referee.User = user;
                await _db.Referees.AddAsync(referee);

                await _db.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Пользователь с таким email уже существует");
        }



        [HttpPost("Edit")]
        public async Task<IActionResult> Edit([FromBody] Referee referee)
        {
            try {
                var r = _db.Referees.Where<Referee>(x => x.Id == referee.Id).Single();
                r.FullName = referee.FullName;
                r.Bio = referee.Bio;
                r.City = referee.City;
                r.Avatar = referee.Avatar;
                
                _db.Referees.Update(r);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch {
                return BadRequest("Пользователь с указанным Id не найден");
            }
        }

        [HttpPost("Delete")]
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
        public IActionResult GetById([FromBody] int id)
        {
            var referee = _db.Referees.Where(referee => referee.Id == id);
            if (referee == null) {
                return BadRequest("Пользователь не найден");
            }
            return Ok(referee);
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
            return Ok(_db.Referees);
        }

        [HttpGet("Login")]
        public IActionResult Login([FromBody]User user) {
            try {
                var u = _db.Users.Where(x => x.Login == user.Login).Single();
                if (u.Password == user.Password) {
                    return Ok();
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
    }
}