using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using System.Web.Http.Cors;
using WebAPI.Contextos;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", exposedHeaders: "X-My-Header")]
    public class ClientesController : ApiController
    {
        private ContextoCliente db = new ContextoCliente();


      
        public List<Cliente> Get()
        {
            var lista = db.Clientes.ToList();
            var listaTransposta = new List<Cliente>();

            foreach (var X in lista)
            {
                listaTransposta.Add(new Cliente(X.Id, X.Nome, X.Email));
            }

            return listaTransposta;
        }

       
        public void Post(string nome, string email)
        {

            if (!string.IsNullOrEmpty(nome) ||
                !string.IsNullOrEmpty(email))
            {
               this.db.Clientes.Add(new Cliente(0, nome, email));
               this.db.SaveChanges();
            }
        }

    }
}
