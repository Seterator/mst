using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Show {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string VideoLink { get; set; }
        public string WebLink { get; set; }
        public byte[] Image { get; set; }

        public List<ShowNomination> ShowNominations { get; set; }
        public List<Estimation> Estimations { get; set; }
        public Show() {
            ShowNominations = new List<ShowNomination>();
            Estimations = new List<Estimation>();
        }
    }
}