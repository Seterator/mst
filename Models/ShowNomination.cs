using System.Collections.Generic;

namespace mst.Models {
    public class ShowNomination {
        public int ShowId { get; set; }
        public Show Show { get; set; }
        public int NominationId { get; set; }
        public Nomination Nomination { get; set; }
        // Номинант
        public string Person { get; set; }
    }
}