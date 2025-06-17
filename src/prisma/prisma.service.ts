/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/prisma/prisma.service.ts
import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//A classe precisa ter o decorador @Injectable()
@Injectable() // <--- ESTE DECORADOR É CRÍTICO!
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log('PrismaService conectado ao banco de dados.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('PrismaService desconectado do banco de dados.');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
