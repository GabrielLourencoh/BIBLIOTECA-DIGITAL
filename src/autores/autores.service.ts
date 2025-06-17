import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

import { PrismaService } from '../prisma/prisma.service';
import { Autor } from '@prisma/client';

@Injectable()
export class AutoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAutorDto: CreateAutorDto): Promise<Autor> {
    try {
      const novoAutor = await this.prisma.autor.create({
        data: createAutorDto,
      });
      return novoAutor;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Já existe um autor com este CPF. O CPF deve ser único.',
        );
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar criar o autor.',
      );
    }
  }

  async findAll(): Promise<Autor[]> {
    const autores = await this.prisma.autor.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return autores;
  }

  async findOne(id: number): Promise<Autor> {
    const autor = await this.prisma.autor.findUnique({
      where: { id },
    });

    if (!autor) {
      throw new NotFoundException(
        `Autor de ID: ${id} não encontrado no sistema!`,
      );
    }
    return autor;
  }

  async update(id: number, updateAutorDto: UpdateAutorDto): Promise<Autor> {
    try {
      const autorAtualizado = await this.prisma.autor.update({
        where: { id },
        data: updateAutorDto,
      });
      return autorAtualizado;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Já existe um autor com o CPF fornecido. O CPF deve ser único.',
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Autor de ID: ${id} não encontrado para atualização.`,
        );
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar atualizar o autor.',
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.autor.delete({
        where: { id },
      });
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Autor de ID: ${id} não encontrado para remoção.`,
        );
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro interno ao tentar remover o autor.',
      );
    }
  }
}
