import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LivroRepository } from '../../domain/repositories/livro.repository';
import { RemoveLivroOutputDto } from '../../presentation/dtos/outputs/remove-livro.output';

@Injectable()
export class RemoveLivroUseCase {
  constructor(private readonly livroRepository: LivroRepository) {}

  async execute(id: number): Promise<RemoveLivroOutputDto> {
    try {
      const livroExist = await this.livroRepository.findOne(id);

      if (!livroExist) {
        throw new NotFoundException(
          `Livro de ID ${id} não encontrado para a remoção`,
        );
      }

      const livroDeleted = await this.livroRepository.remove(id);

      return new RemoveLivroOutputDto(
        'Autor removido com sucesso!',
        livroDeleted,
      );
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
