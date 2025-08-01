import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Autor as DomainAutorEntity } from '../domain/entities/autor.entity';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { UpdateAutorDto } from '../presentation/dtos/inputs/update-autor.dto';
import { HashingService } from 'src/modules/auth/domain/services/hashing.service';
import { UpdateAutorOutputDto } from '../presentation/dtos/outputs/update-autor.output';

@Injectable()
export class UpdateAutorUseCase {
  constructor(
    private readonly autorRepository: AutorRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(
    id: number,
    updateAutordto: UpdateAutorDto,
  ): Promise<UpdateAutorOutputDto> {
    try {
      const autorAtual = await this.autorRepository.findOne(id);

      if (!autorAtual) {
        throw new NotFoundException(`Autor com ID ${id} não encontrado`);
      }

      let hashedPassword = autorAtual.password;

      if (updateAutordto.password) {
        hashedPassword = await this.hashingService.hash(
          updateAutordto.password,
        );
      }

      const autor = new DomainAutorEntity(
        updateAutordto.nome ?? autorAtual.nome,
        hashedPassword,
        updateAutordto.cpf ?? autorAtual.cpf,
        updateAutordto.nacionalidade ?? autorAtual.nacionalidade,
        updateAutordto.idade ?? autorAtual.idade,
        autorAtual.createdAt,
        new Date(),
        autorAtual.id,
      );

      const autorAtualizado = await this.autorRepository.update(id, autor);

      return new UpdateAutorOutputDto(
        'Autor atualizado com sucesso!',
        autorAtualizado,
      );
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
