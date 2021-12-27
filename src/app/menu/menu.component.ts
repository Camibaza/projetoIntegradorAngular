import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuario: Usuario = new Usuario();

  listaCategorias: Categoria[];
  listaProdutos: Produto[];

  tipoUser: string;
  confirmarSenha: string;

  constructor(
    public auth: AuthService,
    private prod: ProdutoService,
    private cat: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    this.getAllCategorias();
    this.getAllProdutos();
  }

  getAllCategorias() {
    this.cat.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp;
    });
  }

  getAllProdutos() {
    this.prod.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp;
    });
  }

  sair() {
    localStorage.clear();
  }
  
  tipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  cadastrar(){
    console.log(environment)
    this.usuario.tipo = this.tipoUser

    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão incorretas.')
    } else {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        alert('Usuario Cadastrado com sucesso!')
      })
    }
  }
}