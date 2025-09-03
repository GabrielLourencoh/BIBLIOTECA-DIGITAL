import { Module } from '@nestjs/common';
import { HealthController } from './presentation/controllers/health.controller';
import { GetHealthUseCase } from './application/use-cases/get-health.use-case';
import { PrismaHealthRepository } from './infra/prisma/prisma-health.repository';
import { HealthRepository } from './domain/repositories/health.repository';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [HealthController],
  // `providers`: Não precisamos de provedores extras para esta lógica simples,
  // pois o HealthController injeta diretamente o PrismaService (que é global).
  providers: [
    GetHealthUseCase,
    {
      provide: HealthRepository,
      useClass: PrismaHealthRepository,
    },
  ],
  // `exports`: Não precisamos exportar nada, pois este módulo é apenas
  // para expor o Health Check e não será injetado em outros lugares.
})
export class HealthModule {}
