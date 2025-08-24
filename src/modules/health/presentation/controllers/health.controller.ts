import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GetHealthUseCase } from '../../application/use-cases/get-health.use-case';
import { FastifyReply } from 'fastify';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
  constructor(private readonly getHealthUseCase: GetHealthUseCase) {}

  @ApiOperation({ summary: 'Verificar a vida da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Retorno da verificação da vida retornada com sucesso!',
  })
  @Get()
  async getHealth(@Res() res: FastifyReply) {
    try {
      const healtStatus = await this.getHealthUseCase.execute();

      if (healtStatus.database === 'down') {
        return res.status(HttpStatus.SERVICE_UNAVAILABLE).send(healtStatus);
      }

      console.log('[Health Check]: Controller subiu');
      return res.status(HttpStatus.OK).send(healtStatus);
    } catch (error) {
      console.log('[Health Check]: ERRO NO CONTROLLER', error);

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
