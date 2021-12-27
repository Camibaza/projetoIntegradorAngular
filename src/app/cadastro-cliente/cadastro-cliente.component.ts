import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  usuario: Usuario = new Usuario()
  
  
  
  confirmarSenha: string;
  tipoUser: string;


  constructor(
    private authService: AuthService,
    private router: Router


  ) { }

  ngOnInit() {
    window.scroll(0,0)
  
  }
  
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUser = event.target.value
  }
  
  cadastrar(){
    console.log(environment)
    this.usuario.tipo = this.tipoUser

    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        alert('Usuario Cadastrado com sucesso!')
      })
    }
  }


}
