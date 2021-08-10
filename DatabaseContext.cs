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
        public DbSet<ShowNomination> ShowNominations { get; set; }
        public DbSet<ShowReferee> ShowReferees { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Referee>(entity => {
                entity.Property(x => x.Avatar).HasColumnType("blob");
            });

            modelBuilder.Entity<Nomination>()
                .HasOne(x => x.Competition)
                .WithMany(t => t.Nominations)
                .HasForeignKey(p => p.CompetitionId);

            modelBuilder.Entity<ShowNomination>()
                .HasKey( u => new { u.ShowId, u.NominationId, u.RefereeId });

            modelBuilder.Entity<Referee>()
                .HasOne(x => x.User).WithOne(q => q.Referee)
                .HasForeignKey<User>(f => f.RefereeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ShowReferee>()
                .HasKey(q => new { q.RefereeId, q.ShowId });
        }
    }
}