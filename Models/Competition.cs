using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mst.Models {
    public class Competition {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<Nomination> Nominations { get; set; }
        public List<BlockedReferee> BlockedReferees { get; set; }
        public List<AvailableCompetition> AvailableCompetitions { get; set; } = new List<AvailableCompetition>();
    }
}