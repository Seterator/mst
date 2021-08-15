using Microsoft.EntityFrameworkCore;
using mst.Models;

namespace mst
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Referee> Referees { get; set; }
        public DbSet<Show> Shows { get; set; }
        public DbSet<Nomination> Nominations { get; set; }
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<ShowReferee> ShowReferees { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Referee>(entity => {
                entity.Property(x => x.Avatar).HasColumnType("longblob");
            });
            modelBuilder.Entity<Show>(entity => {
                entity.Property(x => x.Image).HasColumnType("longblob");
            });

            modelBuilder.Entity<Nomination>()
                .HasOne(x => x.Competition)
                .WithMany(t => t.Nominations)
                .HasForeignKey(p => p.CompetitionId);

            modelBuilder.Entity<ShowNomination>()
                .HasKey( u => new { u.ShowId, u.NominationId });

            modelBuilder.Entity<ShowNomination>()
                .HasOne(sn => sn.Nomination)
                .WithMany(n => n.ShowNominations)
                .HasForeignKey(sn => sn.NominationId);
            
            modelBuilder.Entity<ShowNomination>()
                .HasOne(sn => sn.Show)
                .WithMany(s => s.ShowNominations)
                .HasForeignKey(sn => sn.ShowId);

            modelBuilder.Entity<Estimation>()
                .HasKey( u => new { u.ShowId, u.NominationId, u.RefereeId });

            modelBuilder.Entity<Estimation>()
                .HasOne(e => e.Show)
                .WithMany(sn => sn.Estimations)
                .HasForeignKey(e => e.ShowId);

            modelBuilder.Entity<Estimation>()
                .HasOne(e => e.Nomination)
                .WithMany(sn => sn.Estimations)
                .HasForeignKey(e => e.NominationId);

            modelBuilder.Entity<Estimation>()
                .HasOne(e => e.Referee)
                .WithMany(r => r.Estimations)
                .HasForeignKey(e => e.RefereeId);

            
            modelBuilder.Entity<Referee>()
                .HasOne(x => x.User).WithOne(q => q.Referee)
                .HasForeignKey<User>(f => f.RefereeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ShowReferee>()
                .HasKey(q => new { q.RefereeId, q.ShowId });

            modelBuilder.Entity<BlockedReferee>()
                .HasKey( x => new { x.CompetitionId, x.RefereeId });

            modelBuilder.Entity<BlockedReferee>()
                .HasOne(e => e.Competition)
                .WithMany(c => c.BlockedReferees)
                .HasForeignKey(x => x.CompetitionId);
            
            modelBuilder.Entity<BlockedReferee>()
                .HasOne(e => e.Referee)
                .WithMany(c => c.BlockedReferees)
                .HasForeignKey(x => x.RefereeId);

            modelBuilder.Entity<AvailableCompetition>()
                .HasKey( x => new { x.CompetitionId, x.RefereeId });

            modelBuilder.Entity<AvailableCompetition>()
                .HasOne(x => x.Competition)
                .WithMany(x => x.AvailableCompetitions)
                .HasForeignKey(x => x.CompetitionId);
 
            modelBuilder.Entity<AvailableCompetition>()
                .HasOne(x => x.Referee)
                .WithMany(x => x.AvailableCompetitions)
                .HasForeignKey(x => x.RefereeId);
        }
    }
}