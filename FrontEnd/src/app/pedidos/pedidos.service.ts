import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Produto} from '../produtos/produtos.model'
import { Pedido } from './pedido.model'

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http : HttpClient) { }

  listarPedidos(){
    return this.http.get<Pedido[]>("https://localhost:44301/api/pedidos")
  }

  cadastrarPedidos(data, cliente, produtos: Produto[], valor, desconto, valorTotal){

    var params  = new HttpParams().set("data", data).set("cliente", cliente)
    .set("valor", valor).set("desconto", desconto).set("valorTotal", valorTotal)

    var headers = new HttpHeaders().append("Content-Type", "application/json")

    var ids : number[] =[]
    for(var i=0;  i < produtos.length; i++ ){
        ids.push(produtos[i].id)
    }
    var body = JSON.stringify(ids)
    console.log(body)

    return this.http.post("https://localhost:44301/api/pedidos", body, {params, headers})

  }
}
