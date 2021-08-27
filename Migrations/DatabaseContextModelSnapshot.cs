﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using mst;

namespace Mst.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.8");

            modelBuilder.Entity("AvailableCompetition", b =>
                {
                    b.Property<int>("CompetitionId")
                        .HasColumnType("int");

                    b.Property<int>("RefereeId")
                        .HasColumnType("int");

                    b.HasKey("CompetitionId", "RefereeId");

                    b.HasIndex("RefereeId");

                    b.ToTable("AvailableCompetition");
                });

            modelBuilder.Entity("mst.Models.BlockedReferee", b =>
                {
                    b.Property<int>("ShowId")
                        .HasColumnType("int");

                    b.Property<int>("RefereeId")
                        .HasColumnType("int");

                    b.HasKey("ShowId", "RefereeId");

                    b.HasIndex("RefereeId");

                    b.ToTable("BlockedReferee");
                });

            modelBuilder.Entity("mst.Models.Competition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("BeginDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Link")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Competitions");
                });

            modelBuilder.Entity("mst.Models.Estimation", b =>
                {
                    b.Property<int>("ShowId")
                        .HasColumnType("int");

                    b.Property<int>("NominationId")
                        .HasColumnType("int");

                    b.Property<int>("RefereeId")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.HasKey("ShowId", "NominationId", "RefereeId");

                    b.HasIndex("NominationId");

                    b.HasIndex("RefereeId");

                    b.ToTable("Estimation");
                });

            modelBuilder.Entity("mst.Models.Nomination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CompetitionId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CompetitionId");

                    b.ToTable("Nominations");
                });

            modelBuilder.Entity("mst.Models.Referee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<byte[]>("Avatar")
                        .HasColumnType("mediumblob");

                    b.Property<string>("Bio")
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("FullName")
                        .HasColumnType("longtext");

                    b.Property<string>("Login")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Referees");

                    b.HasData(
                        new
                        {
                            Id = 5,
                            Email = "manager@musicalheart.ru",
                            FullName = "Администратор",
                            Login = "manager@musicalheart.ru"
                        });
                });

            modelBuilder.Entity("mst.Models.Show", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<byte[]>("Image")
                        .HasColumnType("mediumblob");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("ShortDescription")
                        .HasColumnType("longtext");

                    b.Property<string>("VideoLink")
                        .HasColumnType("longtext");

                    b.Property<string>("WebLink")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Shows");
                });

            modelBuilder.Entity("mst.Models.ShowNomination", b =>
                {
                    b.Property<int>("ShowId")
                        .HasColumnType("int");

                    b.Property<int>("NominationId")
                        .HasColumnType("int");

                    b.Property<string>("Person")
                        .HasColumnType("longtext");

                    b.HasKey("ShowId", "NominationId");

                    b.HasIndex("NominationId");

                    b.ToTable("ShowNomination");
                });

            modelBuilder.Entity("mst.Models.ShowReferee", b =>
                {
                    b.Property<int>("RefereeId")
                        .HasColumnType("int");

                    b.Property<int>("ShowId")
                        .HasColumnType("int");

                    b.Property<bool>("Watched")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("RefereeId", "ShowId");

                    b.ToTable("ShowReferees");
                });

            modelBuilder.Entity("mst.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Login")
                        .HasColumnType("longtext");

                    b.Property<string>("OldPassword")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<int>("RefereeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RefereeId")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 5,
                            Login = "manager@musicalheart.ru",
                            Password = "60cxmn5y",
                            RefereeId = 5
                        });
                });

            modelBuilder.Entity("AvailableCompetition", b =>
                {
                    b.HasOne("mst.Models.Competition", "Competition")
                        .WithMany("AvailableCompetitions")
                        .HasForeignKey("CompetitionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mst.Models.Referee", "Referee")
                        .WithMany("AvailableCompetitions")
                        .HasForeignKey("RefereeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Competition");

                    b.Navigation("Referee");
                });

            modelBuilder.Entity("mst.Models.BlockedReferee", b =>
                {
                    b.HasOne("mst.Models.Referee", "Referee")
                        .WithMany("BlockedReferees")
                        .HasForeignKey("RefereeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mst.Models.Show", "Show")
                        .WithMany("BlockedReferees")
                        .HasForeignKey("ShowId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Referee");

                    b.Navigation("Show");
                });

            modelBuilder.Entity("mst.Models.Estimation", b =>
                {
                    b.HasOne("mst.Models.Nomination", "Nomination")
                        .WithMany("Estimations")
                        .HasForeignKey("NominationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mst.Models.Referee", "Referee")
                        .WithMany("Estimations")
                        .HasForeignKey("RefereeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mst.Models.Show", "Show")
                        .WithMany("Estimations")
                        .HasForeignKey("ShowId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Nomination");

                    b.Navigation("Referee");

                    b.Navigation("Show");
                });

            modelBuilder.Entity("mst.Models.Nomination", b =>
                {
                    b.HasOne("mst.Models.Competition", "Competition")
                        .WithMany("Nominations")
                        .HasForeignKey("CompetitionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Competition");
                });

            modelBuilder.Entity("mst.Models.ShowNomination", b =>
                {
                    b.HasOne("mst.Models.Nomination", "Nomination")
                        .WithMany("ShowNominations")
                        .HasForeignKey("NominationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mst.Models.Show", "Show")
                        .WithMany("ShowNominations")
                        .HasForeignKey("ShowId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Nomination");

                    b.Navigation("Show");
                });

            modelBuilder.Entity("mst.Models.User", b =>
                {
                    b.HasOne("mst.Models.Referee", "Referee")
                        .WithOne("User")
                        .HasForeignKey("mst.Models.User", "RefereeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Referee");
                });

            modelBuilder.Entity("mst.Models.Competition", b =>
                {
                    b.Navigation("AvailableCompetitions");

                    b.Navigation("Nominations");
                });

            modelBuilder.Entity("mst.Models.Nomination", b =>
                {
                    b.Navigation("Estimations");

                    b.Navigation("ShowNominations");
                });

            modelBuilder.Entity("mst.Models.Referee", b =>
                {
                    b.Navigation("AvailableCompetitions");

                    b.Navigation("BlockedReferees");

                    b.Navigation("Estimations");

                    b.Navigation("User");
                });

            modelBuilder.Entity("mst.Models.Show", b =>
                {
                    b.Navigation("BlockedReferees");

                    b.Navigation("Estimations");

                    b.Navigation("ShowNominations");
                });
#pragma warning restore 612, 618
        }
    }
}
