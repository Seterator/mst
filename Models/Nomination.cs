using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Nomination {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompetitionId { get; set; }
        public Competition Competition { get; set; }
        
        public List<ShowNomination> ShowNominations { get; set; }
        public Nomination() {
            ShowNominations = new List<ShowNomination>();
        }
    }
}