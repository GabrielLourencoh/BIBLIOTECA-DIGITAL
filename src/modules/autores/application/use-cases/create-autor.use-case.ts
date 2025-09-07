import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Autor as DomainAutorEntity } from '../../domain/entities/autor.entity';

import { AutorRepository } from '../../domain/repositories/autor.repository';
import { HashingService } from 'src/modules/auth/domain/services/hashing.service';
import { CreateAutorOutputDto } from '../../presentation/dtos/outputs/create-autor.output';
import { CreateAutorDto } from '../../presentation/dtos/inputs/create-autor.dto';

@Injectable()
export class CreateAutorUseCase {
  constructor(
    private readonly autorRepository: AutorRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(data: CreateAutorDto): Promise<CreateAutorOutputDto> {
    try {
      const newAutor = await DomainAutorEntity.create(
        data,
        this.hashingService,
      );

      const autorCriado = await this.autorRepository.create(newAutor);

      return new CreateAutorOutputDto('Autor criado com sucesso!', autorCriado);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe um autor com este CPF.');
      }
      throw new InternalServerErrorException('Erro ao criar o autor.');
    }
  }
}
