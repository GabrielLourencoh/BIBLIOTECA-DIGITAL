import { Livro } from '../entities/livro.entity';

// Interface para o Repositório
export abstract class LivroRepository {
  // MÉTODO CREATE
  abstract create(livro: Livro): Promise<Livro>;
}
