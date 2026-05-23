import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  imports: [FormsModule],
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
})
export class LoginAdmin {
  login = ""
  senha = ""

  autenticarLogin = "admin@industrial.com";
  autenticarSenha = "1234"

  constructor( private router: Router){}


  onBotaoClicado(){
    if(!this.login.trim() || !this.senha.trim()){
      alert('Preencha todos os campos');
      return;
    }else{
      if((this.autenticarLogin != this.login) || this.autenticarSenha != this.senha ){
        alert('Acesso negado')
      }else{
        this.router.navigate(['/inventario']);
      }
    }

    
  }
}
