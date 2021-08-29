using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mst.Migrations
{
    public partial class _2908_AddSNCompetition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Competitions",
                columns: new[] { "Id", "BeginDate", "EndDate", "Link", "Name" },
                values: new object[] { 99, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(9999, 12, 31, 23, 59, 59, 999, DateTimeKind.Unspecified).AddTicks(9999), null, "Зрительское голосование" });

            migrationBuilder.InsertData(
                table: "Nominations",
                columns: new[] { "Id", "CompetitionId", "Name" },
                values: new object[] { 99, 99, "Зрительское голосование" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Nominations",
                keyColumn: "Id",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "Competitions",
                keyColumn: "Id",
                keyValue: 99);
        }
    }
}
