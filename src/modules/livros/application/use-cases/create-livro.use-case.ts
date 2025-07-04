import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LivroRepository } from '../domain/repositories/livro.repository';
import { CreateLivroDto } from '../presentation/dtos/inputs/create-livro.dto';
import { Livro as DomainLivroEntity } from '../domain/entities/livro.entity';

@Injectable()
export class CreateLivroUseCase {
  constructor(private readonly livroRepository: LivroRepository) {}

  async execute(createLivroDto: CreateLivroDto): Promise<DomainLivroEntity> {
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

      return livroCriado;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe um autor com este CPF.');
      }
      throw new InternalServerErrorException('Erro ao criar o autor.');
    }
  }
}
