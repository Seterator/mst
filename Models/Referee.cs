using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Referee {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public byte[] Avatar { get; set; }
        public string Bio { get; set; }
        public string City { get; set; }

        public User User { get; set; }

        public List<Estimation> Estimations { get; set; }
        public List<BlockedReferee> BlockedReferees { get; set; }
        public List<AvailableCompetition> AvailableCompetitions { get; set; } = new List<AvailableCompetition>();
        public Referee() {
            Estimations = new List<Estimation>();
            BlockedReferees = new List<BlockedReferee>();
        }
    }
}