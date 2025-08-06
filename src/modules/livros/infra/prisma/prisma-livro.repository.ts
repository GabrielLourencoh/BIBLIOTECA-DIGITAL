import { Injectable } from '@nestjs/common';
import { LivroRepository } from '../../domain/repositories/livro.repository';
import { Livro as DomainLivroEntity } from '../../domain/entities/livro.entity';
import { Livro as PrismaLivroModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LivroMapper } from '../../mappers/livro.mapper';

@Injectable()
export class PrismaLivroRepository implements LivroRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(livro: DomainLivroEntity): Promise<DomainLivroEntity> {
    const prismaDataForCreate = LivroMapper.toPersistence(livro);

    // Remove o ID do objeto de dados se ele for undefined ou null,
    // garantindo que o Prisma não tente inserir um ID para campos auto-incrementados.
    if (prismaDataForCreate.id === undefined || prismaDataForCreate === null) {
      delete prismaDataForCreate.id;
    }

    const createdLivroMapper: PrismaLivroModel = await this.prisma.livro.create(
      {
        data: prismaDataForCreate,
      },
    );

    return LivroMapper.toDomain(createdLivroMapper)!;
  }

  async findAll(): Promise<DomainLivroEntity[]> {
    const prismaLivros = await this.prisma.livro.findMany({
      orderBy: { id: 'desc' },
    });

    return prismaLivros.map((livro) => LivroMapper.toDomain(livro)!);
  }
}
