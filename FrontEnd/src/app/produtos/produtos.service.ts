import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import {Produto} from './produtos.model'

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  listarProdutos(){
    return this.http.get<Produto[]>("https://localhost:44301/api/produtos")
  }

  cadastrarProduto(nome, valor, foto){

    var params = new HttpParams().set("nome" , nome).set("valor" , valor).set("foto", foto);
    var headers= new HttpHeaders().append("Content-Type", "application/jason")

    console.log(foto)



     return this.http.post("https://localhost:44301/api/produtos", "...", {params, headers})
  }
}
