import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from '@prisma/client';

@Injectable()
export class LivrosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLivroDto: CreateLivroDto): Promise<Livro> {
    const { autorId, ...dadosLivro } = createLivroDto;

    const autor = await this.prisma.autor.findUnique({
      where: { id: autorId },
    });

    if (!autor) {
      throw new NotFoundException(`Autor de ID ${autorId} não encontrado`);
    }

    try {
      return await this.prisma.livro.create({
        data: {
          ...dadosLivro,
          autor: { connect: { id: autorId } },
        },
        include: {
          autor: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Já existe um livro com o ISBN fornecido. O ISBN deve ser único.',
        );
      }
      throw new InternalServerErrorException(
        'Erro interno ao tentar criar o livro.',
      );
    }
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.livro.findMany({
      orderBy: { id: 'desc' },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<any> {
    const livro = await this.prisma.livro.findUnique({
      where: { id },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    if (!livro) {
      throw new NotFoundException(`Livro de ID ${id} não encontrado`);
    }

    return livro;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto): Promise<Livro> {
    try {
      return await this.prisma.livro.update({
        where: { id },
        data: updateLivroDto,
      });
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2002') {
        throw new ConflictException('Já existe um livro com o ISBN fornecido.');
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025') {
        throw new NotFoundException(`Livro de ID ${id} não encontrado`);
      }
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar o livro.',
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.livro.delete({ where: { id } });
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'P2025') {
        throw new NotFoundException(`Livro de ID ${id} não encontrado`);
      }
      throw new InternalServerErrorException('Erro ao tentar remover o livro.');
    }
  }
}
