using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mst.Migrations
{
    public partial class _2008_ChangeImageColumnType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "Shows",
                type: "mediumblob",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "longblob",
                oldNullable: true);

            migrationBuilder.AlterColumn<byte[]>(
                name: "Avatar",
                table: "Referees",
                type: "mediumblob",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "longblob",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "Shows",
                type: "longblob",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "mediumblob",
                oldNullable: true);

            migrationBuilder.AlterColumn<byte[]>(
                name: "Avatar",
                table: "Referees",
                type: "longblob",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "mediumblob",
                oldNullable: true);
        }
    }
}
