import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../model/tipos';

@Injectable({
  providedIn: 'root',
})
export class Pessoas {  
  private API:string = "http://127.0.0.1:3000/pessoas"
    constructor(private http: HttpClient){  }
    
    listar(): Observable<Pessoa[]>{

      return this.http.get<Pessoa[]>(this.API);

    }

    incluir(cadastro: Pessoa): Observable<Pessoa>{
      return this.http.post<Pessoa>(this.API, cadastro)
    }

}
