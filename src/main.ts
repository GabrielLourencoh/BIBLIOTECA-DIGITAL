import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
// Importando módulos do Swagger
import { env } from './config/env';
import { setupGlobalPipes } from './shared/presentation/config/pipes.config';
import { setupSwagger } from './shared/presentation/config/docs.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  setupGlobalPipes(app);

  setupSwagger(app);

  await app.listen(env.APP_PORT ?? 3000);
}
void bootstrap();
