using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Pedido
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string data { get; set; }
        public virtual ICollection<Produto> produtos { get; set; }
        public Cliente cliente { get; set; }
        public float valor { get; set; }
        public float desconto { get; set; }
        public float valorTotal { get; set; }

        public Pedido(int id, string data, List<Produto> produto, Cliente cliente,
                        float valor, float desconto, float valorTotal)
        {
            this.id = id;
            this.data = data;
            produtos = new List<Produto>();
          
            foreach (var x in produto){
                this.produtos.Add(x);
            }
            
            this.cliente = cliente;
            this.valor = valor;
            this.desconto = desconto;
            this.valorTotal = valorTotal;
        }

        public Pedido()
        {
         
        }

    }
}