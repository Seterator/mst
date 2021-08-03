using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class BlockedRefereeShow {
        public int ShowId { get; set; }
        public Show Show { get; set; }
        public int RefereeId { get; set; }
        public Referee Referee { get; set; }
    }
}