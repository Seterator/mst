using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class RefereeNominee {
        public int NominationId { get; set; }
        public Nominee Nominee { get; set; }
        public int RefereeId { get; set; }
        public Referee Referee { get; set; }
        public int Score { get; set; }
    }
}