import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AutorRepository } from '../domain/repositories/autor.repository';
import { FindOneAutorOutputDto } from '../presentation/dtos/outputs/find-one-autor.output';

@Injectable()
export class FindOneAutorUseCase {
  constructor(private readonly autorRepository: AutorRepository) {}

  async execute(id: number): Promise<FindOneAutorOutputDto> {
    try {
      const autor = await this.autorRepository.findOne(id);

      if (!autor) {
        throw new NotFoundException(`Autor de ID ${id} não encontrado`);
      }

      return new FindOneAutorOutputDto('Autor encotrado com sucesso!', autor);
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
