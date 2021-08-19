using Microsoft.EntityFrameworkCore.Migrations;

namespace Mst.Migrations
{
    public partial class _1908_ShowRefereeDeleteBlocked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Blocked",
                table: "ShowReferees");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Blocked",
                table: "ShowReferees",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
