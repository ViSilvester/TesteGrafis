import { Component, OnInit } from '@angular/core';
import { Produto } from '../produtos/produtos.model';
import {Pedido} from './pedido.model';
import { PedidosService } from './pedidos.service';
import { ProdutosService } from '../produtos/produtos.service';
import {ClientesService} from '../clientes/clientes.service'
import { Cliente } from '../clientes/cliente.model';
import {DatePipe} from '@angular/common'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent implements OnInit {

  dataSource : Pedido[] = []

  tempData = this.datePipe.transform(new Date, "dd-MM-yyyy")
  tempProdutos : Produto[] = []
  Produtos  : Produto[] = []
  ObsProdutos : Observable<Produto[]> = new Observable<Produto[]>()
  tempClientes : Cliente [] = []
  tempCliente: number = null
  tempDesconto = 0
  tempValor = 0
  tempValorTotal = 0
  tempProduto : number
  alertaDesconto = ""
  alertaCliente = ""
  alertaProduto = ""

  cadastrar = false

  displayedColumns: string[] = [ 'numero',
    'data',
    'produto',
    'cliente',
    'valor',
    'desconto',
    'valorTotal'];

  constructor(private service : PedidosService,
              private produtoService: ProdutosService,
              private clienteService: ClientesService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.listaPedidos()
    this.produtoService.listarProdutos().subscribe( data => {this.Produtos = data}, err => console.log(err))
    this.clienteService.listarClientes().subscribe( data => {this.tempClientes = data}, err => console.log(err))
  }

  listaPedidos(){
    this.service.listarPedidos().subscribe(data => {this.dataSource = data}, err => console.log(err))
  }

  exibirCadastrarPedidos(){
    this.cadastrar = true
  }

  ocultarCadastrarPedidos(){
    this.tempProdutos  = []
    this.tempCliente = null
    this.tempDesconto = 0
    this.tempValor = 0
    this.tempValorTotal = 0
    this.tempProduto = null
    this.alertaDesconto = ""
    this.alertaCliente = ""
    this.alertaProduto = ""
    this.cadastrar = false
  }

  cadastrarPedidos(){
    if(this.tempCliente == null){
        this.alertaCliente = "Campo obrigatorio"
    }
    else{
      this.alertaCliente = ""
    }
    if( this.tempProdutos.length == 0){
        this.alertaProduto = "Campo obrigatorio"
    }
    else{
      this.alertaProduto = ""
    }
    if(this.alertaCliente === "" &&
      this.alertaDesconto === "" &&
      this.alertaProduto === "" ){

          this.service.cadastrarPedidos(this.tempData, this.tempCliente,
            this.tempProdutos, this.tempValor, this.tempDesconto, this.tempValorTotal)
            .subscribe(r =>{console.log(r); this.listaPedidos()})
          this.tempProdutos =[]
          this.tempValor =0;
          this.tempValorTotal=0;
          this.tempDesconto=0;
          this.tempCliente = null;
          this.ocultarCadastrarPedidos()
    }
  }

  calcularValorTotal(){
    this.tempValorTotal = 0
    this.tempValor = 0

    for(var i=0; i< this.tempProdutos.length; i++){
      this.tempValor += this.tempProdutos[i].valor
    }

    if(this.tempDesconto > this.tempValor){
      this.alertaDesconto = "Desconto maior que valor total"
      this.tempValorTotal += this.tempValor
    }
    else if(this.tempDesconto < 0 ){
      this.alertaDesconto = "Desconto precisa ser positivo"
      this.tempValorTotal += this.tempValor
    }
    else{
      this.alertaDesconto = "";
      this.tempValorTotal += this.tempValor - this.tempDesconto
    }

   
    
  }

  adicionarProduto(){
      console.log(this.tempCliente)
      for (var i =0; i< this.Produtos.length; i++){
        if(this.Produtos[i].id == this.tempProduto){
            this.tempProdutos.push(this.Produtos[i])
        }
      }
      this.calcularValorTotal()
  }

  inserirCliente(valor : number){
      if(valor != null && valor > 0){
        this.tempCliente = valor
        this.alertaCliente = ""
      }
      else{
        this.tempCliente = null
      }
  }


}
