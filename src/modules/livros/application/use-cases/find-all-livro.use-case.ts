import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LivroRepository } from '../../domain/repositories/livro.repository';
import { FindAllLivrosOutputdto } from '../../presentation/dtos/outputs/find-all-livros.output';

@Injectable()
export class FindAllLivroUseCase {
  constructor(private readonly livroRepository: LivroRepository) {}

  async execute(): Promise<FindAllLivrosOutputdto> {
    try {
      const livros = await this.livroRepository.findAll();
      const qtdeLivros = livros.length;
      return new FindAllLivrosOutputdto(qtdeLivros, livros);
    } catch {
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar listar os autores.',
      );
    }
  }
}
