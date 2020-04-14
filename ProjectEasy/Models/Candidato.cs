using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace ProjectEasy.Models
{
    [Table("Candidato")]
    public class Candidato
    {

        public int id { get; set; }
        public string nome { get; set; }
        public string email { get; set; }
        public string telefone { get; set; }
        public string skype { get; set; }
        public string linkedin { get; set; }
        public string portfolio { get; set; }
        public string estado { get; set; }
        public string cidade { get; set; }
        public string salario { get; set; }
        public bool? horasPorDia { get; set; }
        public bool? horarioParaTrabalho { get; set; }

    }
}

