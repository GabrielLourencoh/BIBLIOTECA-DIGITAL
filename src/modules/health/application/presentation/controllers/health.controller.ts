import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FastifyReply } from 'fastify';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getHealth(@Res() res: FastifyReply) {
    let dbStatus: string = 'down';
    try {
      // Tenta executar uma query SQL simples para verificar a conexão com o banco de dados.
      // 'SELECT 1' é uma query universalmente usada para testar a conectividade sem afetar dados.
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'up';
    } catch (error) {
      console.log('Erro ao verificar a conexão com o banco: ', error);
      dbStatus = 'down';
    }
    const healthStatus = {
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    };

    if (dbStatus === 'down') {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).send(healthStatus);
    }

    return res.status(HttpStatus.OK).send(healthStatus);
  }
}
