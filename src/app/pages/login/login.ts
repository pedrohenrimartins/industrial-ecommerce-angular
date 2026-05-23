import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [Header, Footer, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  titulo = 'Faça seu Login!'
  email = ''
  senha = ''
  botaoDesabilitado: boolean = false;

  constructor(private login: LoginService, private router: Router){}

  

  onBotaoClicado() {
    if(!this.email.trim() || !this.senha.trim()){
      alert('Preencha todos os campos');
      return;
    }

    this.login.login(this.email, this.senha).subscribe(usuario => {
      
      if(usuario && usuario.senha == this.senha){
        this.login.salvarSessao(usuario);
        this.router.navigate(['/home']);
      } else{
        alert('Email ou senha incorretos!!')
      }
    })

    console.log(this.email + "|" + this.senha )

    


  }

}
