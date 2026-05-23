import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderAdmin } from '../../shared/header-admin/header-admin';
import { MenuAdminInventario } from '../../shared/menu-admin-inventario/menu-admin-inventario';
import { ProdutoService } from '../../services/produto-service';
import { Produto } from '../../model/tipos';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [HeaderAdmin, MenuAdminInventario, CommonModule, RouterLink],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario implements OnInit {
    listaProdutos: Produto[] = [];

    constructor(private service: ProdutoService,
      private cdr: ChangeDetectorRef
    ){ 
    }

    ngOnInit(): void {
          this.service.listar().subscribe((produtos)=>{
              console.log("inventario carregado")
               console.log("DADOS:", produtos);
              this.listaProdutos = produtos;
              this.cdr.detectChanges();
          })
    }

    excluir(id:string){
        if(id){
          this.service.excluir(id).subscribe(() => {
          window.location.reload()
        })
      }
}

}

