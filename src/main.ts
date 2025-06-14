import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Garante que DTOs sejam instanciados e tipos transformados
      whitelist: true, // Remove propriedades não esperadas
      forbidNonWhitelisted: true, // Lança erro se propriedades não esperadas forem enviadas
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
