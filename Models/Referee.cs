using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Referee {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string FIO { get; set; }
        public byte[] Avatar { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
    }
}