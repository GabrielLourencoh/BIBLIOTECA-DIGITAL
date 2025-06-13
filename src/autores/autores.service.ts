import { Injectable } from '@nestjs/common';
// import { CreateAutorDto } from './dto/create-autor.dto';
// import { UpdateAutorDto } from './dto/update-autor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './entities/autor.entity';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}
  // create(createAutorDto: CreateAutorDto) {
  //   return 'This action adds a new autore';
  // }

  async findAll() {
    const autores = await this.autorRepository.find({
      order: {
        id: 'desc',
      },
    });

    return autores;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} autore`;
  // }

  // update(id: number, updateAutoreDto: UpdateAutorDto) {
  //   return `This action updates a #${id} autore`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} autore`;
  // }
}
