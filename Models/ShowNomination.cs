namespace mst.Models {
    public class ShowNomination {
        public int ShowId { get; set; }
        public Show Show { get; set; }
        public int NominationId { get; set; }
        public Nomination Nomination { get; set; }
        public int RefereeId { get; set; }
        public int Score { get; set; }
    }
}