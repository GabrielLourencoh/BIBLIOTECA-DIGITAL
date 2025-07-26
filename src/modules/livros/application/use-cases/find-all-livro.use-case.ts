import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LivroRepository } from '../domain/repositories/livro.repository';
import { Livro as DomainLivroEntity } from '../domain/entities/livro.entity';

@Injectable()
export class FindAllLivroUseCase {
  constructor(private readonly livroRepository: LivroRepository) {}

  async execute(): Promise<DomainLivroEntity[]> {
    try {
      const livros = await this.livroRepository.findAll();
      return livros;
    } catch {
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar listar os autores.',
      );
    }
  }
}
