import { Component, OnInit } from '@angular/core'
import {ProdutosService} from './produtos.service'
import { Produto } from './produtos.model'

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})

export class ProdutosComponent implements OnInit {

  dataSource : Produto[] = []
  tempNome = ""
  tempValor = 0.0
  tempFoto
  cadastrar = false
  alertaValor =""
  alertaNome =""

  constructor(private service : ProdutosService) {  }

  ngOnInit(): void {
    this.listarProdutos()
  }

  listarProdutos(){
    this.service.listarProdutos().subscribe( data => { this.dataSource = data}, err=> console.log(err))
  }

  exibirCadastrarProduto(){
    this.cadastrar = true
  }

  ocultarCadastrarProduto(){
    this.cadastrar = false
  }

  addFile(file){
    this.tempFoto = file
  } 


  cadastrarProduto(){

    if(this.tempNome === ""){
      this.alertaNome = "Campo Obrigatorio"
    }
    else{
      this.alertaNome = ""
    }
    if(this.tempValor == 0){
      this.alertaValor = "Produto precisa ter uma valor"
    }
    else if (this.tempValor < 0){
      this.alertaValor = "Campo precisa ser positivo"
    }
    else{
      this.alertaValor = ""
    }
    if(this.alertaNome === "" &&
      this.alertaValor === ""
      ){
        this.service.cadastrarProduto(this.tempNome, this.tempValor, this.tempFoto)
        .subscribe(r => {console.log(r); this.listarProdutos()})
        this.tempNome = ""
        this.tempValor = 0
        this.tempFoto = null
        this.cadastrar = false
    }

  }
  

  displayedColumns: string[] = ['nome', 'valor', 'foto'];


}
