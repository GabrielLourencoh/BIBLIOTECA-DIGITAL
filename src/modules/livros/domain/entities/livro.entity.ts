export class Livro {
  id?: number;
  titulo: string;
  isbn: string;
  genero: string;
  anoPublicacao: number;
  paginas: number;
  autorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    titulo: string,
    isbn: string,
    genero: string,
    anoPublicacao: number,
    paginas: number,
    autorId: number,
    createdAt: Date,
    updatedAt: Date,
    id?: number,
  ) {
    this.id = id;
    this.titulo = titulo;
    this.isbn = isbn;
    this.genero = genero;
    this.anoPublicacao = anoPublicacao;
    this.paginas = paginas;
    this.autorId = autorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
