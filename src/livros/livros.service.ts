import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Livro } from './entities/livro.entity';
import { CreateLivroDto } from './dto/create-livro.dto';
import { Autor } from '../autores/entities/autor.entity';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: Repository<Livro>,
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  async create(createLivroDto: CreateLivroDto) {
    const { autorId } = createLivroDto;
    // Encontrar o autor que está criando o recado
    const autor = await this.autorRepository.findOneBy({ id: autorId });

    if (!autor) {
      throw new NotFoundException(`Autor de ID ${autorId} não encontrado`);
    }

    const cadastroLivro = {
      titulo: createLivroDto.titulo,
      isbn: createLivroDto.isbn,
      genero: createLivroDto.genero,
      anoPublicacao: createLivroDto.anoPublicacao,
      paginas: createLivroDto.paginas,
      autorId,
    };
    const livro = this.livroRepository.create(cadastroLivro);
    await this.livroRepository.save(livro);

    return {
      ...livro,
    };
  }

  async findAll() {
    const livros = await this.livroRepository.find({
      order: {
        id: 'desc',
      },
      relations: ['autor'],
      select: {
        // Seleciona os campos da entidade Livro
        id: true,
        titulo: true,
        isbn: true,
        genero: true,
        anoPublicacao: true,
        paginas: true,
        // Específica os campos da entidade 'autor' dentro da relação
        autor: {
          id: true,
          nome: true,
        },
      },
    });

    return livros;
  }

  async findOne(id: number) {
    const livro = await this.livroRepository.findOne({
      where: { id: id },
      relations: ['autor'],
      select: {
        // Seleciona os campos da entidade Livro
        id: true,
        titulo: true,
        isbn: true,
        genero: true,
        anoPublicacao: true,
        paginas: true,
        // Específica os campos da entidade 'autor' dentro da relação
        autor: {
          id: true,
          nome: true,
        },
      },
    });

    if (!livro) {
      throw new NotFoundException(`O livro de ID: ${id} não foi encontrado!`);
    }

    return livro;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    const livro = await this.livroRepository.findOneBy({ id: id });

    if (!livro) {
      throw new NotFoundException(`Livro de ID ${id} não encontrado`);
    }

    const livroAtualizado = this.livroRepository.merge(livro, updateLivroDto);

    try {
      await this.livroRepository.save(livroAtualizado);
      return livroAtualizado;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if ((error as any).code === '23505') {
          throw new ConflictException(
            'Já existe um livro com o ISBN fornecido. O ISBN deve ser único.',
          );
        }
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar atualizar o autor.',
      );
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} livro`;
  // }
}
