using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectEasy.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Candidato",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    telefone = table.Column<int>(nullable: true),
                    skype = table.Column<string>(nullable: true),
                    linkedin = table.Column<string>(nullable: true),
                    portfolio = table.Column<string>(nullable: true),
                    estado = table.Column<string>(nullable: true),
                    cidade = table.Column<string>(nullable: true),
                    salario = table.Column<int>(nullable: true),
                    horasPorDia = table.Column<bool>(nullable: true),
                    horarioParaTrabalho = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidato", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Candidato");
        }
    }
}
