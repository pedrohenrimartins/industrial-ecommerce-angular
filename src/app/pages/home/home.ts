import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Produto } from '../../model/tipos';
import { ProdutoService } from '../../services/produto-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  listaProdutos: Produto[] = [];

  constructor(private http: HttpClient, private router: Router,private produtoService: ProdutoService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
          this.produtoService.listar().subscribe((produtos)=>{
              console.log("inventario carregado")
              console.log("DADOS:", produtos);
              this.listaProdutos = produtos;
              this.cdr.detectChanges();
          })
    }



}
