import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Pessoa } from '../../model/tipos';
import { Pessoas } from '../../services/pessoas';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [Header, Footer, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {

  listaPessoas: Pessoas[] = [];

  constructor(private service: Pessoas, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.service.listar().subscribe((Pessoas)=>{
        this.listaPessoas = Pessoas;
        console.log(this.listaPessoas);
      })
    }

    pessoa: Pessoa = {} as Pessoa;

  submeter(){
    this.pessoa.carrinho = this.pessoa.carrinho || [];    
    this.service.incluir(this.pessoa).subscribe(()=>{
      this.router.navigate(['/login']);
      alert("cadastro efetuado!")
    })

  }


}
