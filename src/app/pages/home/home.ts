import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Produto } from '../../model/tipos';
import { ProdutoService } from '../../services/produto-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { CarrinhoService } from '../../services/carrinho-service';

@Component({
  selector: 'app-home',
  imports: [Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  listaProdutos: Produto[] = [];
  idsNoCarrinho: string[] = [];

  constructor(private http: HttpClient, private router: Router, private produtoService: ProdutoService, private cdr: ChangeDetectorRef, private loginService: LoginService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.produtoService.listar().subscribe((produtos) => {
      console.log("inventario carregado")
      console.log("DADOS:", produtos);
      this.listaProdutos = produtos;
      this.cdr.detectChanges();
    })

    this.carrinhoService.carregarCarrinho().subscribe((carrinho) => {

    carrinho.forEach(produto => {
      this.idsNoCarrinho.push(produto.produtoID!);
    });

  })
}

  adicionarAoCarrinho(produto: Produto) {

    if (!this.loginService.estalogado()) {
      alert('Você precisar entrar para fazer está ação')
      this.router.navigate(['/login']);
    } 

    if (this.idsNoCarrinho.includes(produto.id!)) {
    alert('Esse produto já está no carrinho!');
    return;
    }
     this.carrinhoService.adicionarCarrinho(produto).subscribe(() => {
    this.idsNoCarrinho.push(produto.id!);

    alert('Produto adicionado ao carrinho!');

  });



  }



}
