import { Injectable } from '@nestjs/common';
import { Autor } from '@prisma/client';
import { AutorRepository } from '../../domain/repositories/autor.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAutorDto } from '../../presentation/dtos/inputs/create-autor.dto';
import { UpdateAutorDto } from '../../presentation/dtos/inputs/update-autor.dto';

@Injectable()
export class PrismaAutorRepository implements AutorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAutorDto): Promise<Autor> {
    return this.prisma.autor.create({ data });
  }

  async findAll(): Promise<Autor[]> {
    return this.prisma.autor.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number): Promise<Autor | null> {
    return this.prisma.autor.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAutorDto): Promise<Autor> {
    return this.prisma.autor.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.autor.delete({
      where: { id },
    });
  }
}
