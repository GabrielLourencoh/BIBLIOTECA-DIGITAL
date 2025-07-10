import { PrismaService } from 'src/prisma/prisma.service';
import { HealthRepository } from '../../domain/repositories/health.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaHealthRepository implements HealthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checkDatabaseConnection(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      console.log('Prisma repositorio OK');
      return true;
    } catch (error) {
      console.log(
        'Falha na conexão com o banco de dados (Health Check):',
        error,
      );
      return false;
    }
  }
}
