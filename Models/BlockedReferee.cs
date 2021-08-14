namespace mst.Models {
    public class BlockedReferee {
        public int CompetitionId { get; set; }
        public Competition Competition { get; set; }
        public int RefereeId { get; set; }
        public Referee Referee { get; set; }
    }
}