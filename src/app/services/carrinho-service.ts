import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login-service';
import { map, Observable, of, switchMap } from 'rxjs';
import { itemCarrinho, Pessoa, Produto } from '../model/tipos';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private API = "http://localhost:3000/pessoas"

  constructor(private http: HttpClient, private loginService: LoginService){}

  carregarCarrinho(): Observable<itemCarrinho[]>{
    const usuario = this.loginService.getUsuario();
    if(!usuario?.id) return of ([]);

    return this.http.get<Pessoa>(`${this.API}/${usuario.id}`).pipe(map(pessoa => pessoa.carrinho || []));
  }

  adicionarCarrinho(produto: Produto): Observable<Pessoa>{
    return this.carregarCarrinho().pipe(
      switchMap(itens => {
        itens.push({
          produtoID: produto.id!,
          nome: produto.nome,
          categoria: produto.categoria,
          preco: produto.preco,
          quantidade: 1
        });

        const usuario = this.loginService.getUsuario();
        return this.http.patch<Pessoa>(`${this.API}/${usuario?.id}`, {carrinho : itens})
      })
    )
  }

  alterarQuantidade(produtoID: string, quantidade: 1 | -1): Observable<Pessoa>{
    return this.carregarCarrinho().pipe(
      switchMap(itens => {
        const item = itens.find(i=> i.produtoID === produtoID);
        if(item){
          item.quantidade += quantidade;
          if(item.quantidade <=0){
            return this.removerCarrinho(produtoID);
          }
        }
        const usuario = this.loginService.getUsuario();
        return this.http.patch<Pessoa>(`${this.API}/${usuario?.id}`, {carrinho: itens})
      }
    )
    )
  }

  removerCarrinho(produtoID: string): Observable<Pessoa>{
    return this.carregarCarrinho().pipe(
      switchMap(itens => {
        const itensAtualizados = itens.filter(i => i.produtoID !== produtoID)
        const usuario = this.loginService.getUsuario();
        return this.http.patch<Pessoa>(`${this.API}/${usuario?.id}`, {carrinho: itensAtualizados})
      })
      
    )
  }
}
