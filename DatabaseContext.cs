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

            var referee = new Referee();
            referee.Id = 1;
            referee.Email = "semen1032@email.org";
            referee.FullName = "Хрен Херов Херович";
            referee.City = "Хуебескин-сити";
            referee.Bio = "Описание";
            

            var referee2 = new Referee();
            referee2.Id = 2;
            referee2.Email = "ass1032@email.org";
            referee2.FullName = "Жопкин Жоп Жопанович";
            referee2.City = "Жопа";
            referee2.Bio = "Описание жопы";

            //modelBuilder.Entity<Referee>().HasData(referee2);
            //modelBuilder.Entity<Referee>().HasData(referee);
        }
    }
}