import { Injectable } from '@nestjs/common';
import { HealthRepository } from '../../domain/repositories/health.repository';

@Injectable()
export class GetHealthUseCase {
  constructor(private readonly healthRepository: HealthRepository) {}

  async execute() {
    let dbStatus = 'down';

    try {
      const dbCheck = await this.healthRepository.checkDatabaseConnection();

      if (dbCheck) {
        dbStatus = 'up';
      }
      console.log(`USE CASE: Database Status ${dbStatus.toUpperCase()}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('USE CASE: Erro ao verificar status');

      dbStatus = 'down';
    }

    return {
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      }),
    };
  }
}
