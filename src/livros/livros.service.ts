import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from './entities/livro.entity';
import { CreateLivroDto } from './dto/create-livro.dto';
import { Autor } from '../autores/entities/autor.entity';

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
    });

    return livros;
  }

  async findOne(id: number) {
    const livro = await this.livroRepository.findOneBy({
      id: id,
    });

    if (!livro) {
      throw new NotFoundException(`O livro de ID: ${id} não foi encontrado!`);
    }

    return livro;
  }

  // update(id: number, updateLivroDto: UpdateLivroDto) {
  //   return `This action updates a #${id} livro`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} livro`;
  // }
}
