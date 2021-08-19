using System.Collections.Generic;

namespace mst.Models {
    public class Estimation {
        public int RefereeId { get; set; }
        public Referee Referee { get; set; }
        public int NominationId { get; set; }
        public Nomination Nomination { get; set; }
        public int ShowId { get; set; }
        public Show Show { get; set; }
        public int Score { get; set; }
    }
}