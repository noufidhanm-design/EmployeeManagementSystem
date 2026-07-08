using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class addcolumnsinEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "tbl_Employee",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Allowance",
                table: "tbl_Employee",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "DOB",
                table: "tbl_Employee",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "EmpId",
                table: "tbl_Employee",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "tbl_Employee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MaritalStatus",
                table: "tbl_Employee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Nationality",
                table: "tbl_Employee",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "tbl_Employee");

            migrationBuilder.DropColumn(
                name: "Allowance",
                table: "tbl_Employee");

            migrationBuilder.DropColumn(
                name: "DOB",
                table: "tbl_Employee");

            migrationBuilder.DropColumn(
                name: "EmpId",
                table: "tbl_Employee");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "tbl_Employee");

            migrationBuilder.DropColumn(
                name: "MaritalStatus",
                table: "tbl_Employee");

            migrationBuilder.DropColumn(
                name: "Nationality",
                table: "tbl_Employee");
        }
    }
}
