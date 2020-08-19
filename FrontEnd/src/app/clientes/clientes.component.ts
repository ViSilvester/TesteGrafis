import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import {Cliente} from './cliente.model'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  
  dataSource : Cliente[] = [];
  cadastrar = false
  tempNome : string = ""
  tempEmail : string = ""
  alertaNome = ""
  alertaEmail = ""
  emailvalido = true

  constructor(private service : ClientesService) { }

  ngOnInit(): void {
      this.listarClientes();
  }

  listarClientes(){
    this.service.listarClientes().subscribe((data: Cliente[]) => {this.dataSource = data}, err=> console.log(err))
  }

  visualizarCadastrarCliente(){
    this.cadastrar = true;
  }

  ocultarCadastrarCliente(){
    this.cadastrar = false;
  }

  cadastrarCliente(){

    console.log(this.emailvalido)

    if(this.tempNome === ""){
      this.alertaNome = "Campo obrigatorio"
    }
    else{
      this.alertaNome = ""
    }
    if(this.tempEmail === ""){
      this.alertaEmail = "Campo obrigatorio"
    }
    else if(!this.tempEmail.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")){
      this.alertaEmail = "Email invalido"
    }
    else{
      this.alertaEmail = ""
      for(var i =0; i< this.dataSource.length ; i++){
        if(this.dataSource[i].Email === this.tempEmail){
          this.alertaEmail = "Email ja cadastrado"
        }
      }
    }

    if(this.alertaNome === "" && this.alertaEmail === ""){
        this.service.cadastrarCliente(this.tempNome, this.tempEmail)
        .subscribe(r => {console.log(r); this.listarClientes()});
        this.listarClientes()
        this.tempNome = ""
        this.tempEmail = ""
        this.cadastrar = false;
      }
  }



  displayedColumns: string[] = ['nome', 'email'];

}
