import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Autor as DomainAutorEntity } from '../domain/entities/autor.entity';
import { CreateAutorDto } from '../presentation/dtos/inputs/create-autor.dto';
import { AutorRepository } from '../domain/repositories/autor.repository';

@Injectable()
export class CreateAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(data: CreateAutorDto): Promise<DomainAutorEntity> {
    try {
      const newDomainAutor = new DomainAutorEntity(
        data.nome,
        data.cpf,
        data.nacionalidade,
        data.idade,
        new Date(), // createdAt
        new Date(), // updatedAt
        undefined,
      );

      return await this.autorRepository.create(newDomainAutor);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe um autor com este CPF.');
      }
      throw new InternalServerErrorException('Erro ao criar o autor.');
    }
  }
}
