import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from '../../../config/env';

export function setupSwagger(app: NestFastifyApplication): void {
  // Configurações do documento Swagger
  const config = new DocumentBuilder()
    .setTitle('Biblioteca Digital')
    .setDescription('API de gerenciamento de autores e livros')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT (Bearer) aqui para autenticação',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  if (env.APP_ENV === 'dev') {
    console.log('------------------------------------');
    console.log(`API rodando na porta ${env.APP_PORT}.`);
    console.log(`API: ${env.APP_URL}`);
    console.log(`Docs: ${env.APP_URL}/api`);
    console.log('------------------------------------');
  }
}
