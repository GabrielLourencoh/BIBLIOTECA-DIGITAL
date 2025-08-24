import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LivroRepository } from '../../domain/repositories/livro.repository';
import { UpdateLivroDto } from '../../presentation/dtos/inputs/update-livro.dto';
import { UpdateLivroOutputDto } from '../../presentation/dtos/outputs/update-livro.output';
import { Livro as DomainLivroEntity } from '../../domain/entities/livro.entity';

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

      const updatedLivro = new DomainLivroEntity(
        updateLivroDto.titulo ?? livroAtual.titulo,
        updateLivroDto.isbn ?? livroAtual.isbn,
        updateLivroDto.genero ?? livroAtual.genero,
        updateLivroDto.anoPublicacao ?? livroAtual.anoPublicacao,
        updateLivroDto.paginas ?? livroAtual.paginas,
        updateLivroDto.autorId ?? livroAtual.autorId,
        livroAtual.createdAt,
        new Date(),
      );

      const livroAtualizado = await this.livroRepository.update(
        id,
        updatedLivro,
      );

      return new UpdateLivroOutputDto(
        'Livro atualizado com sucesso!',
        livroAtualizado,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar buscar o livro.',
      );
    }
  }
}
