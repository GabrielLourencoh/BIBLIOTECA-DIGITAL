import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { Autor } from '@prisma/client';

@Injectable()
export class FindAllAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {} // Injetando a interface

  async execute(): Promise<Autor[]> {
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
