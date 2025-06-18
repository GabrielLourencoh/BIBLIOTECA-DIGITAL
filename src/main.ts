import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
// Importando módulos do Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(), // <- Dizendo ao NestJS para usar o Fastify
  );

  // Definindo as configurações da documentação Swagger
  const config = new DocumentBuilder()
    .setTitle('Biblioteca Digital') // Titulo da documentação
    .setDescription('API de gerenciamento de autores e livros') // Descrição opcional
    .setVersion('1.0') // Versão da API
    .build();

  // Cria o documento Swagger com base na config e nos endpoints existentes
  const document = SwaggerModule.createDocument(app, config);

  // Ativa a interface Swagger na rota /api (ex: http://localhos:3000/api)
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Garante que DTOs sejam instanciados e tipos transformados
      whitelist: true, // Remove propriedades não esperadas
      forbidNonWhitelisted: true, // Lança erro se propriedades não esperadas forem enviadas
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
