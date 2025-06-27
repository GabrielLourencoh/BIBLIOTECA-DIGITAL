import { Injectable } from '@nestjs/common';
import { Autor as PrismaAutorModel } from '@prisma/client';
import { Autor as DomainAutorEntity } from '../../domain/entities/autor.entity';
import { AutorRepository } from '../../domain/repositories/autor.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAutorDto } from '../../presentation/dtos/inputs/create-autor.dto';
import { UpdateAutorDto } from '../../presentation/dtos/inputs/update-autor.dto';
import { AutorMapper } from '../../mappers/autor.mapper';

@Injectable()
export class PrismaAutorRepository implements AutorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAutorDto): Promise<DomainAutorEntity> {
    // Para 'create', não enviamos o 'id' se ele for auto-gerado pelo banco de dados.
    // Usamos os dados diretamente do DTO para criar no Prisma.
    const prismaData = {
      nome: data.nome,
      cpf: data.cpf,
      nacionalidade: data.nacionalidade,
      idade: data.idade,
      createdAt: new Date(), // Data de criação
      updatedAt: new Date(), // Data de atualização
    };

    // Executando a operação no Prisma
    const createdPrismaAutor: PrismaAutorModel = await this.prisma.autor.create(
      {
        data: prismaData,
      },
    );

    // Converte o modelo Prisma retornado de volta para a Entidade de Domínio e retorna para a camada de aplicação
    return AutorMapper.toDomain(createdPrismaAutor)!;
  }

  async findAll(): Promise<DomainAutorEntity[]> {
    const prismaAutores = await this.prisma.autor.findMany({
      orderBy: { id: 'desc' },
    });

    // Map para converter cada autor do array retornado
    return prismaAutores.map((autor) => AutorMapper.toDomain(autor)!);
  }

  async findOne(id: number): Promise<DomainAutorEntity | null> {
    const prismaAutor = await this.prisma.autor.findUnique({
      where: { id },
    });

    return AutorMapper.toDomain(prismaAutor);
  }

  async update(id: number, data: UpdateAutorDto): Promise<DomainAutorEntity> {
    const prismaAutorUpdatedData = {
      ...data,
      updatedAt: new Date(),
    };

    const prismaAutorUpdated = await this.prisma.autor.update({
      where: { id },
      data: prismaAutorUpdatedData,
    });

    return AutorMapper.toDomain(prismaAutorUpdated)!;
  }

  async remove(id: number): Promise<DomainAutorEntity> {
    const prismaAutorRemoved = await this.prisma.autor.delete({
      where: { id: id },
    });

    return AutorMapper.toDomain(prismaAutorRemoved)!;
  }
}
