using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Nominee { 
        public int NominationId { get; set; }
        public Nomination Nomination { get; set; }
        public int ShowId { get; set; }
        public Show Show { get; set; }
    }
}