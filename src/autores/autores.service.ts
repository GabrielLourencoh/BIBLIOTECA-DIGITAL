import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Autor } from './entities/autor.entity';
import { CreateAutorDto } from './dto/create-autor.dto';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  async create(createAutorDto: CreateAutorDto) {
    try {
      const dadosAutor = {
        nome: createAutorDto.nome,
        cpf: createAutorDto.cpf,
        nacionalidade: createAutorDto.nacionalidade,
        idade: createAutorDto.idade,
      };

      const novoAutor = this.autorRepository.create(dadosAutor);
      await this.autorRepository.save(novoAutor);

      return novoAutor;
    } catch (error) {
      // Captura qualquer erro que ocorra no bloco try
      if (error instanceof QueryFailedError) {
        // Verifica se o erro é do banco de dados (TypeORM)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if ((error as any).code === '23505') {
          // Verifica se é um erro de violação de unicidade (código PostgreSQL)
          throw new ConflictException('Já existe um autor com este CPF.'); // Lança uma exceção HTTP 409 (Conflito) para o cliente
        }
      }
      throw new InternalServerErrorException( // Lança uma exceção HTTP 500 (Erro Interno do Servidor) para o cliente
        'Ocorreu um erro interno ao tentar criar o autor.',
      );
    }
  }

  async findAll() {
    const autores = await this.autorRepository.find({
      order: {
        id: 'desc',
      },
    });

    return autores;
  }

  async findOne(id: number) {
    const autor = await this.autorRepository.findOneBy({
      id: id,
    });

    if (!autor) {
      throw new NotFoundException(
        `Autor de ID: ${id} não encontrado no sistema!`,
      );
    }

    return autor;
  }

  // update(id: number, updateAutoreDto: UpdateAutorDto) {
  //   return `This action updates a #${id} autore`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} autore`;
  // }
}
