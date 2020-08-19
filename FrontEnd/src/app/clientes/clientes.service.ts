import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Cliente} from './cliente.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  listarClientes() : Observable<any>{
    return this.http.get<Cliente[]>("https://localhost:44301/api/Clientes");
  }

  cadastrarCliente(nome : string, email : string,){

    var params = new HttpParams().set("nome" , nome).set("email" , email);
    var headers= new HttpHeaders().append("ContenType", "application/json")

    let url = "https://localhost:44301/api/Clientes";
    return this.http.post(url,"..." ,{headers, params});
  }
}
