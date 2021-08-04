using Microsoft.EntityFrameworkCore;
using mst.Models;

namespace mst
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<Show> Shows { get; set; }
        public DbSet<Nomination> Nominations { get; set; }
        public DbSet<Nominee> Nominees { get; set; }
        public DbSet<Referee> Referees { get; set; }
        public DbSet<RefereeNominee> RefereeNominees { get; set; }
        public DbSet<BlockedRefereeShow> BlockedRefereeShows { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BlockedRefereeShow>().HasKey( u => new { u.RefereeId, u.ShowId });
            modelBuilder.Entity<Nominee>().HasKey(u => new { u.NominationId, u.ShowId });
            modelBuilder.Entity<RefereeNominee>().HasKey(u => new { u.NominationId, u.RefereeId });

            modelBuilder.Entity<BlockedRefereeShow>().HasOne(x => x.Referee);
            modelBuilder.Entity<BlockedRefereeShow>().HasOne(x => x.Show);

            modelBuilder.Entity<Nominee>().HasOne(x => x.Nomination);
            modelBuilder.Entity<Nominee>().HasOne(x => x.Show);

            modelBuilder.Entity<RefereeNominee>().HasOne(x => x.Nominee);
            modelBuilder.Entity<RefereeNominee>().HasOne(x => x.Referee);

            modelBuilder.Entity<Referee>(entity => {
                entity.Property(x => x.Avatar).HasColumnType("blob");
            });
        }
    }
}