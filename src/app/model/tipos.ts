export interface Produto{
    id?: string;
    nome: string;
    categoria: string;
    preco: number;
    estoque: number;
    descricao: string;
}

export interface itemCarrinho{
    produtoID: string,
    nome: string,
    categoria: string,
    preco: number,
    quantidade: number
}

export interface Pessoa{
    id?: string;
    email: string,
    senha: string,
    carrinho: itemCarrinho[]   
}



