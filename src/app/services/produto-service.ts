import { Injectable } from '@angular/core';
import { Produto } from '../model/tipos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
    private API:string = "http://localhost:3000/produtos"
    constructor(private http: HttpClient){ }

    listar(): Observable<Produto[]>{
        return this.http.get<Produto[]>(this.API)
    }
    buscarPorId(id: string): Observable<Produto | undefined> {
    return this.http.get<Produto>(this.API + `/${id}`);
    }
    incluir(produto: Produto): Observable<Produto>{
      return this.http.post<Produto>(this.API, produto)
    }
    editar(produto: Produto): Observable<Produto>{
      const url = `${this.API}/${produto.id}`
      return this.http.put<Produto>(url, produto)
    }
    excluir(id: string): Observable<Produto>{
      return this.http.delete<Produto>(this.API + `/${id}`);
}
}
