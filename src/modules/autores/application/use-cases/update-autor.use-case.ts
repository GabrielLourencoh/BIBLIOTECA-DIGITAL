import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAutorDto } from '../../dto/update-autor.dto';
import { Autor } from '@prisma/client';
import { AutorRepository } from '../domain/repositories/autor.repository';

@Injectable()
export class UpdateAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(id: number, updateAutordto: UpdateAutorDto): Promise<Autor> {
    try {
      const autorAtualizado = await this.autorRepository.update(
        id,
        updateAutordto,
      );

      return autorAtualizado;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Já existe um autor com o CPF fornecido. O CPF deve ser único.',
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Autor de ID: ${id} não encontrado para atualização.`,
        );
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar atualizar o autor.',
      );
    }
  }
}
