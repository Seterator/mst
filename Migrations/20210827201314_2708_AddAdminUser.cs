using Microsoft.EntityFrameworkCore.Migrations;

namespace Mst.Migrations
{
    public partial class _2708_AddAdminUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Referees",
                columns: new[] { "Id", "Avatar", "Bio", "City", "Email", "FullName", "Login" },
                values: new object[] { 5, null, null, null, "manager@musicalheart.ru", "Администратор", "manager@musicalheart.ru" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Login", "OldPassword", "Password", "RefereeId" },
                values: new object[] { 5, "manager@musicalheart.ru", null, "60cxmn5y", 5 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Referees",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
