import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LivroRepository } from '../../domain/repositories/livro.repository';
import { FindOneLivroOutputDto } from '../../presentation/dtos/outputs/find-one-livro.output';

@Injectable()
export class FindOneLivroUseCase {
  constructor(private readonly livroRepository: LivroRepository) {}

  async execute(id: number): Promise<FindOneLivroOutputDto> {
    try {
      const livro = await this.livroRepository.findOne(id);

      if (!livro) {
        throw new NotFoundException(`Livro de ID ${id} não encontrado`);
      }

      return new FindOneLivroOutputDto('Livro encontrado com sucesso', livro);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar buscar o livro.',
      );
    }
  }
}
