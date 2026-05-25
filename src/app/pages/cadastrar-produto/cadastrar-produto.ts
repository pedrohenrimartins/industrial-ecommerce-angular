import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuAdmin } from '../../shared/menu-admin/menu-admin';
import { HeaderAdmin } from '../../shared/header-admin/header-admin';
import { Produto } from '../../model/tipos';
import { ProdutoService } from '../../services/produto-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-produto',
  imports: [MenuAdmin, HeaderAdmin, FormsModule],
  templateUrl: './cadastrar-produto.html',
  styleUrl: './cadastrar-produto.css',
})
export class CadastrarProduto implements OnInit {
  produtoId?: string;
  produto: Produto = {} as Produto;

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  const idParam = this.route.snapshot.params['id'];
  this.produtoId = idParam ? String(idParam) : undefined;

  console.log("ID capturado:", this.produtoId);

  if (this.produtoId) {
    this.service.buscarPorId(this.produtoId).subscribe(produto => {
      console.log("Produto retornado:", produto);
      if (produto) {
        this.produto = { ...produto };
        this.cdr.detectChanges();
      }
    });
  }
}

  submeter() {
  console.log("produtoId no submeter:", this.produtoId);
  console.log("produto no submeter:", this.produto);
  
  // Verificações dos campos
  if (!this.produto.nome?.trim()) {
    alert('Preencha o nome do produto!');
    return;
  }

  if (!this.produto.descricao?.trim()) {
    alert('Preencha a descrição do produto!');
    return;
  }

  if (!this.produto.preco || this.produto.preco <= 0) {
    alert('Informe um preço válido!');
    return;
  }

  if (!this.produto.urlImg?.trim()) {
    alert('Informe a URL da imagem!');
    return;
  }

  if (!this.produto.categoria?.trim()) {
    alert('Informe a categoria!');
    return;
  }

  if (!this.produto.estoque || this.produto.estoque < 0) {
    alert('Informe a quantidade em estoque!');
    return;
  }
  if (this.produtoId) {
    this.service.editar(this.produto).subscribe(() => {
      this.router.navigate(['/inventario']);
    });
  } else {
    this.service.incluir(this.produto).subscribe(() => {
      this.router.navigate(['/inventario']);
    });
  }
}
}