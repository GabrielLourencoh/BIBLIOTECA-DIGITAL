import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
// Importando módulos do Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from './config/env';

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
    .addBearerAuth(
      // ✅ Adiciona o esquema de segurança BearerAuth
      {
        type: 'http', // Tipo de esquema de segurança
        scheme: 'bearer', // Esquema (Bearer)
        bearerFormat: 'JWT', // Formato (JWT)
        description: 'Insira o token JWT (Bearer) aqui para autenticação', // Descrição para o usuário
        name: 'Authorization', // Nome do cabeçalho
        in: 'header', // Onde o token é enviado (no cabeçalho)
      },
      'access-token', // ✅ Nome de segurança único para referenciar este esquema
    )
    .build();

  // Cria o documento Swagger com base na config e nos endpoints existentes
  const document = SwaggerModule.createDocument(app, config);

  // Ativa a interface Swagger na rota /api (ex: http://localhost:3000/api)
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Garante que DTOs sejam instanciados e tipos transformados
      whitelist: true, // Remove propriedades não esperadas
      forbidNonWhitelisted: true, // Lança erro se propriedades não esperadas forem enviadas
    }),
  );

  await app.listen(env.APP_PORT ?? 3000);

  if (env.APP_ENV === 'dev') {
    console.log('------------------------------------');
    console.log(`API rodando na porta ${env.APP_PORT}.`);
    console.log(`API: ${env.APP_URL}`);
    console.log(`Docs: ${env.APP_URL}/api`);
    console.log('------------------------------------');
  }
}
void bootstrap();
