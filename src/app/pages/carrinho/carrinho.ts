import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { itemCarrinho } from '../../model/tipos';
import { CarrinhoService } from '../../services/carrinho-service';

@Component({
  selector: 'app-carrinho',
  imports: [Header, Footer],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  itens: itemCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.carrinhoService.carregarCarrinho().subscribe((itens) => {
      console.log("carrinho carregado")
      console.log("DADOS:", itens);
      this.itens = itens;
      this.cdr.detectChanges();
    })
  }


  recarregar() {
    this.carrinhoService.carregarCarrinho().subscribe((itens) => {
      this.itens = itens;
      this.cdr.detectChanges();
    })
  }

  alterar(produtoID: string, quantidade: 1 | -1) {
    this.carrinhoService.alterarQuantidade(produtoID, quantidade).subscribe(() => this.recarregar())
  }

  remover(produtoID: string){
    this.carrinhoService.removerCarrinho(produtoID).subscribe(() => this.recarregar())
  }

  totalCarrinho() : number{
    let total = 0;
    this.itens.forEach((item) => {
      total += item.preco * item.quantidade;
    })

    return total;
  }

}
