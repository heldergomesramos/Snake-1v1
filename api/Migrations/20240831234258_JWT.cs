using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class JWT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2a37df13-0f1d-4308-bdc9-4cbed6e06e54");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6d9dc8ab-5626-48d6-9cea-8e3b193ad1be");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "PlayerId",
                table: "AspNetUsers",
                newName: "Token");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7f38cc6d-1d03-4ac7-a9b2-8d8e24edebc8", null, "User", "USER" },
                    { "92ad54c3-8dd6-4fb2-b9df-ccfc5a2fad81", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7f38cc6d-1d03-4ac7-a9b2-8d8e24edebc8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "92ad54c3-8dd6-4fb2-b9df-ccfc5a2fad81");

            migrationBuilder.RenameColumn(
                name: "Token",
                table: "AspNetUsers",
                newName: "PlayerId");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2a37df13-0f1d-4308-bdc9-4cbed6e06e54", null, "User", "USER" },
                    { "6d9dc8ab-5626-48d6-9cea-8e3b193ad1be", null, "Admin", "ADMIN" }
                });
        }
    }
}
