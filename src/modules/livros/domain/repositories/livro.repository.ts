import { Livro } from '../entities/livro.entity';

// Interface para o Repositório
export abstract class LivroRepository {
  // MÉTODO CREATE
  abstract create(livro: Livro): Promise<Livro>;

  // MÉTODO FINDALL
  abstract findAll(): Promise<Livro[]>;

  // MÉTODO FINDONE
  abstract findOne(id: number): Promise<Livro | null>;

  // MÉTODO UPDATE
  abstract update(id: number, livro: Livro): Promise<Livro>;

  // MÉTODO REMOVE
  abstract remove(id: number): Promise<Livro>;
}
