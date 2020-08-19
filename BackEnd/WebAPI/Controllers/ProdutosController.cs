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
using System.Web;
using System.IO;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProdutosController : ApiController
    {
        private ContextoCliente db = new ContextoCliente();

        public List<Produto> Get()
        {
            var lista = db.Produtos.ToList();
            var listaTransposta = new List<Produto>();

            foreach ( var X in lista) {
                listaTransposta.Add(new Produto(X.id, X.nome, X.valor, X.foto));
            }
            return listaTransposta;
        }

        public void Post(string nome, float valor, string foto)
        {
            if (foto == null || foto == "") {
                foto = "https://static.thenounproject.com/png/340719-200.png";
            }      
            if (!string.IsNullOrEmpty(nome) &&
                !float.IsNaN(valor))
            {
                db.Produtos.Add(new Produto(1, nome, valor, foto));
                db.SaveChanges();
            }
        }


    }
}
