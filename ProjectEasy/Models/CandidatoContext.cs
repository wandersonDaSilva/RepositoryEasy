using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectEasy.Models
{
    public class CandidatoContext : DbContext
    {
        public CandidatoContext(DbContextOptions<CandidatoContext> options) : base(options)
        {
            Database.EnsureCreated();
        }


        public DbSet<Candidato> Candidato { get; set; }

    }
}