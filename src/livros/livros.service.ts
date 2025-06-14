import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateLivroDto } from './dto/create-livro.dto';
// import { UpdateLivroDto } from './dto/update-livro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from './entities/livro.entity';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: Repository<Livro>,
  ) {}

  // create(createLivroDto: CreateLivroDto) {
  //   return 'This action adds a new livro';
  // }

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
