using mst.Models;

public class AvailableCompetition {
         public int CompetitionId { get; set; }
         public Competition Competition { get; set; }
         public int RefereeId { get; set; }
         public Referee Referee { get; set; }
}