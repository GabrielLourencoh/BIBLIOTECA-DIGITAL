import { Module } from '@nestjs/common';
import { HealthController } from './application/presentation/controllers/health.controller';

@Module({
  controllers: [HealthController],
  // `providers`: Não precisamos de provedores extras para esta lógica simples,
  // pois o HealthController injeta diretamente o PrismaService (que é global).
  providers: [],
  // `exports`: Não precisamos exportar nada, pois este módulo é apenas
  // para expor o Health Check e não será injetado em outros lugares.
})
export class HealthModule {}
