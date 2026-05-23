import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Pessoa } from '../../model/tipos';
import { Pessoas } from '../../services/pessoas';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [Header, Footer, FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {

  listaPessoas: Pessoa[] = [];
  confEmail = '';
  confSenha = '';

  constructor(private service: Pessoas, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.listar().subscribe((pessoas) => {
      this.listaPessoas = pessoas;
      console.log(this.listaPessoas);
    })
  }

  pessoa: Pessoa = {} as Pessoa;

  submeter() { 
    const emailExiste = this.listaPessoas.find(p=> p.email === this.pessoa.email)

    if(emailExiste){
      alert('Email já está cadastrado')
      return;
    }
    if ((this.pessoa.email === this.confEmail) && (this.pessoa.senha === this.confSenha)) {
      this.pessoa.carrinho = this.pessoa.carrinho || [];
      this.service.incluir(this.pessoa).subscribe(() => {
        this.router.navigate(['/login']);
        alert("cadastro efetuado!")
      })
    }else{
      alert('O email ou senha não coincidem')
    }


  }


}
