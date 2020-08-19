using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using System.Web.Http.Cors;
using WebAPI.Contextos;
using System.Security.Cryptography.X509Certificates;
using System.Runtime.CompilerServices;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PedidosController : ApiController
    {
        private ContextoCliente db = new ContextoCliente();




        public List<Pedido> Get() {

            var lista = db.Pedidos.ToList();
            var listaTransposta = new List<Pedido>();

            foreach (var X in lista)
            {
                List<Produto> listaProdutos = new List<Produto>();

                var R = db.Pedidos.Where(p => p.id == X.id).Select(p=> p.cliente).First();
                var P = db.Pedidos.Where(p=> p.id == X.id).SelectMany(pr => pr.produtos).ToList();

                foreach (var y in P) {
                    listaProdutos.Add(new Produto(y.id, y.nome, y.valor, y.foto));
                }


                listaTransposta.Add(new Pedido(X.id, X.data,listaProdutos, new Cliente(R.Id, R.Nome, R.Email),
                                                X.valor, X.desconto, X.valorTotal));
            }

            return listaTransposta;
        }

        public void Post(string data, [FromBody] int[] produtos, int cliente,
                         float valor, float desconto, float valorTotal)
        {

            if (!string.IsNullOrEmpty(data) &&
                    !float.IsNaN(cliente) &&
                    !float.IsNaN(valor) &&
                    !float.IsNaN(desconto) &&
                    !float.IsNaN(valorTotal))
            {

                Pedido pedidoFinal = new Pedido();
                pedidoFinal.produtos = new List<Produto>();

                foreach (var x in produtos) { 
                    pedidoFinal.produtos.Add(db.Produtos.Find(x));
                }

                pedidoFinal.data = data;
                pedidoFinal.cliente = db.Clientes.Find(cliente);
                pedidoFinal.valor = valor;
                pedidoFinal.desconto = desconto;
                pedidoFinal.valorTotal = valorTotal;

                db.Pedidos.Add(pedidoFinal);
                db.SaveChanges();



            }
        }
    }
}
