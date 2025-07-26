import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { FindAllAutoresOutputDto } from '../presentation/dtos/outputs/find-all-autores.output';

@Injectable()
export class FindAllAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {} // Injetando a interface

  async execute(): Promise<FindAllAutoresOutputDto> {
    try {
      const autores = await this.autorRepository.findAll();
      const qtdeAutores = autores.length;

      return new FindAllAutoresOutputDto(qtdeAutores, autores);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar listar os autores.',
      );
    }
  }
}
