using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class User {
        [Key]
        public int Id { get; set; }
        public string OldPassword { get; set; }
        public string Login { get; set; }
        public string Password { get; set; } 

        public int RefereeId { get; set; }
        public Referee Referee { get; set; }
    }
}