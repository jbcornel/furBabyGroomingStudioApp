using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FurBaby.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    OwnerPhone = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    OwnerEmail = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    PetType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PetName = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Breed = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ServiceType = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Appointments");
        }
    }
}
