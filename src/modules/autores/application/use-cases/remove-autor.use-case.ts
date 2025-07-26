import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { RemoveAutorOutputDto } from '../presentation/dtos/outputs/remove-autor.output';

@Injectable()
export class RemoveAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(id: number): Promise<RemoveAutorOutputDto> {
    try {
      const autorDeleted = await this.autorRepository.remove(id);

      return new RemoveAutorOutputDto(
        'Autor removido com sucesso!',
        autorDeleted,
      );
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Autor de ID: '${id}' não foi encontrado para remoção.`,
        );
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar remover o autor.',
      );
    }
  }
}
