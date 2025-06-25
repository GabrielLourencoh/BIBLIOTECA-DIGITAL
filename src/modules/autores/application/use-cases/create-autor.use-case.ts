import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Autor } from '@prisma/client';
import { CreateAutorDto } from '../presentation/dtos/inputs/create-autor.dto';
import { AutorRepository } from '../domain/repositories/autor.repository';

@Injectable()
export class CreateAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(createAutorDto: CreateAutorDto): Promise<Autor> {
    try {
      return await this.autorRepository.create(createAutorDto);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe um autor com este CPF.');
      }
      throw new InternalServerErrorException('Erro ao criar o autor.');
    }
  }
}
