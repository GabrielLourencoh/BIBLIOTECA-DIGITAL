import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Autor as DomainAutorEntity } from '../domain/entities/autor.entity';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { UpdateAutorDto } from '../presentation/dtos/inputs/update-autor.dto';

@Injectable()
export class UpdateAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(
    id: number,
    updateAutordto: UpdateAutorDto,
  ): Promise<DomainAutorEntity> {
    try {
      const autorAtual = await this.autorRepository.findOne(id);
      if (!autorAtual) {
        throw new NotFoundException(`Autor com ID ${id} não encontrado`);
      }

      const autorAtualizado = new DomainAutorEntity(
        updateAutordto.nome ?? autorAtual.nome,
        updateAutordto.cpf ?? autorAtual.cpf,
        updateAutordto.nacionalidade ?? autorAtual.nacionalidade,
        updateAutordto.idade ?? autorAtual.idade,
        autorAtual.createdAt,
        new Date(),
        autorAtual.id,
      );

      return await this.autorRepository.update(id, autorAtualizado);
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
