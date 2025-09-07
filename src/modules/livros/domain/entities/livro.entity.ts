import { CreateLivroDto } from '@/modules/livros/presentation/dtos/inputs/create-livro.dto';
import { UpdateLivroDto } from '@/modules/livros/presentation/dtos/inputs/update-livro.dto';

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

  static create(createLivroDto: CreateLivroDto): Livro {
    return new Livro(
      createLivroDto.titulo,
      createLivroDto.isbn,
      createLivroDto.genero,
      createLivroDto.anoPublicacao,
      createLivroDto.paginas,
      createLivroDto.autorId,
      new Date(),
      new Date(),
    );
  }

  update(updateLivroDto: UpdateLivroDto): void {
    if (updateLivroDto.titulo) this.titulo = updateLivroDto.titulo;
    if (updateLivroDto.isbn) this.isbn = updateLivroDto.isbn;
    if (updateLivroDto.genero) this.genero = updateLivroDto.genero;
    if (updateLivroDto.anoPublicacao)
      this.anoPublicacao = updateLivroDto.anoPublicacao;
    if (updateLivroDto.paginas) this.paginas = updateLivroDto.paginas;
    if (updateLivroDto.autorId) this.autorId = updateLivroDto.autorId;
    this.updatedAt = new Date();
  }
}
