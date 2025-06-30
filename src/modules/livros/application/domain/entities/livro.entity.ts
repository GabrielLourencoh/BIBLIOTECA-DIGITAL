export class Livro {
  id?: number;
  titulo: string;
  isbn: string;
  anoPublicacao: number;
  autorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    titulo: string,
    isbn: string,
    anoPublicacao: number,
    autorId: number,
    createdAt: Date,
    updatedAt: Date,
    id?: number,
  ) {
    this.id = id;
    this.titulo = titulo;
    this.isbn = isbn;
    this.anoPublicacao = anoPublicacao;
    this.autorId = autorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
