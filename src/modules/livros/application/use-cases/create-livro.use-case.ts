import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LivroRepository } from '../../domain/repositories/livro.repository';
import { Livro as DomainLivroEntity } from '../../domain/entities/livro.entity';
import { CreateLivroDto } from '../../presentation/dtos/inputs/create-livro.dto';
import { CreateLivroOutputDto } from '../../presentation/dtos/outputs/create-livro.output';

@Injectable()
export class CreateLivroUseCase {
  constructor(private readonly livroRepository: LivroRepository) {}

  async execute(createLivroDto: CreateLivroDto): Promise<CreateLivroOutputDto> {
    try {
      const novoLivro = new DomainLivroEntity(
        createLivroDto.titulo,
        createLivroDto.isbn,
        createLivroDto.genero,
        createLivroDto.anoPublicacao,
        createLivroDto.paginas,
        createLivroDto.autorId,
        new Date(),
        new Date(),
        undefined,
      );

      const livroCriado = await this.livroRepository.create(novoLivro);

      return new CreateLivroOutputDto('Livro criado com sucesso!', livroCriado);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe um livro com este ISBN.');
      }
      throw new InternalServerErrorException('Erro ao criar o livro.');
    }
  }
}
