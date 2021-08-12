using System.Collections.Generic;

namespace mst.Models {
    public class ShowNomination {
        public int ShowId { get; set; }
        public Show Show { get; set; }
        public int NominationId { get; set; }
        public Nomination Nomination { get; set; }

        public List<Estimation> Estimations { get; set; }
        public ShowNomination() {
            Estimations = new List<Estimation>();
        }
    }
}