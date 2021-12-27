import { Produto } from './../model/Produto';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/Categoria';
import { CarrinhoService } from '../service/carrinho.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  idCat: number;
  listaCategoria: Categoria;

  nome: string;

  produto: Produto = new Produto();

  constructor(
    private cat: CategoriaService,
    private prod: ProdutoService,
    private route: ActivatedRoute,
    private carrinho: CarrinhoService 
  ) { }

  ngOnInit() {
    window.scroll(0,0);
    this.route.params.subscribe(({ id }) => this.getCatById(id));
    this.idCat = this.route.snapshot.params['id']
    this.getCatById(this.idCat);
  }

  getCatById(id: number){
    this.cat.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.listaCategoria = resp
      this.nome = this.listaCategoria.categoria
    })
  }

  getProdById(id: number){
    this.prod.getByIdProduto(id).subscribe((resp: Produto) =>{
      this.produto = resp;
      this.addProduto()
      // this.desconto();
      // this.parcela();
    })
  }

  addProduto(){
    this.carrinho.adicionar(this.produto)
    // console.log(this.carrinho.produtos)
  }

}