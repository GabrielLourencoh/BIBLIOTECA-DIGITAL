import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { Autor } from '@prisma/client';

@Injectable()
export class RemoveAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(id: number): Promise<Autor> {
    try {
      const autorDeleted = await this.autorRepository.remove(id);

      return autorDeleted;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Autor de ID: ${id} não encontrado para remoção.`,
        );
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar remover o autor.',
      );
    }
  }
}
