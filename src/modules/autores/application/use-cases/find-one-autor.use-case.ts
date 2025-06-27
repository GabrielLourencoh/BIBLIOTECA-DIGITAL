import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { Autor as DomainAutorEntity } from '../domain/entities/autor.entity';

@Injectable()
export class FindOneAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(id: number): Promise<DomainAutorEntity> {
    try {
      const autor = await this.autorRepository.findOne(id);

      if (!autor) {
        throw new NotFoundException(`Autor de ID ${id} não encontrado`);
      }

      return autor;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar buscar o autor. ',
      );
    }
  }
}
