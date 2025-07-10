import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GetHealthUseCase } from '../../application/use-cases/get-health.use-case';
import { FastifyReply } from 'fastify';

@Controller('health')
export class HealthController {
  constructor(private readonly getHealthUseCase: GetHealthUseCase) {}

  @Get()
  async getHealth(@Res() res: FastifyReply) {
    try {
      const healtStatus = await this.getHealthUseCase.execute();

      if (healtStatus.database === 'down') {
        return res.status(HttpStatus.SERVICE_UNAVAILABLE).send(healtStatus);
      }

      console.log('Controller subiu');
      return res.status(HttpStatus.OK).send(healtStatus);
    } catch (error) {
      console.log('ERRO NO CONTROLLER', error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: 'error',
        message: 'ERRO INTERNO DO SERVIDOR',
        timestamp: new Date().toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
      });
    }
  }
}
