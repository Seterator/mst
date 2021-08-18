namespace mst.Models {
    public class BlockedReferee {
        public int ShowId { get; set; }
        public Show Show { get; set; }
        public int RefereeId { get; set; }
        public Referee Referee { get; set; }
    }
}