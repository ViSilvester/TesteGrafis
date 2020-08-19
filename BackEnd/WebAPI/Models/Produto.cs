using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebAPI.Models
{
    public class Produto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string nome { get; set; }
        public float valor { get; set; }
        public string foto { get; set; }

        public virtual ICollection<Pedido> pedidos { get; set; }


        public Produto(int id, string nome, float valor,string foto) {
            this.id = id;
            this.nome = nome;
            this.valor = valor;
            this.foto = foto;
        }

        public Produto()
        {
          
        }
    }
}