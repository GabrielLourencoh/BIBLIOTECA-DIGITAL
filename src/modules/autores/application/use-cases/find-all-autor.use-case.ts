import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { Autor as DomainAutorEntity } from '../domain/entities/autor.entity';

@Injectable()
export class FindAllAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {} // Injetando a interface

  async execute(): Promise<DomainAutorEntity[]> {
    try {
      const autores = await this.autorRepository.findAll();
      return autores;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar listar os autores.',
      );
    }
  }
}
