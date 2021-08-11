using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mst.Models {
    public class ExtendedUser {
        public string Login { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        [FromForm(Name = "file")]
        public IFormFile Avatar { get; set; }
        public string Bio { get; set; }
        public string City { get; set; }
        public string Password { get; set; }

    }
}