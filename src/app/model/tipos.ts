export interface Produto{
    id?: string;
    nome: string;
    categoria: string;
    preco: number;
    estoque: number;
    descricao: string;
    urlImg: string;
}

export interface itemCarrinho{
    produtoID: string,
    nome: string,
    categoria: string,
    preco: number,
    quantidade: number,
    urlImg: string
}

export interface Pessoa{
    id?: string;
    email: string,
    senha: string,
    carrinho: itemCarrinho[]   
}



