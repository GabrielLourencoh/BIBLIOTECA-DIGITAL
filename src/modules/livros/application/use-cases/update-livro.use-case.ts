import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LivroRepository } from '../../domain/repositories/livro.repository';
import { UpdateLivroDto } from '../../presentation/dtos/inputs/update-livro.dto';
import { UpdateLivroOutputDto } from '../../presentation/dtos/outputs/update-livro.output';

@Injectable()
export class UpdateLivroUseCase {
  constructor(private readonly livroRepository: LivroRepository) {}

  async execute(
    id: number,
    updateLivroDto: UpdateLivroDto,
  ): Promise<UpdateLivroOutputDto> {
    try {
      const livroAtual = await this.livroRepository.findOne(id);

      if (!livroAtual) {
        throw new NotFoundException(`Livro de ID ${id} não encontrado!`);
      }

      livroAtual.update(updateLivroDto);

      const livroAtualizado = await this.livroRepository.update(id, livroAtual);

      return new UpdateLivroOutputDto(
        'Livro atualizado com sucesso!',
        livroAtualizado,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar atualizar o livro.',
      );
    }
  }
}
