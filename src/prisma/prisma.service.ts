import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('[PrismaService] Conectado ao banco de dados.');
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async enableShutdownHooks(app: INestApplication) {
    app.enableShutdownHooks(); // garante que onModuleDestroy será chamado

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on('beforeExit', async () => {
      await this.$disconnect();
      console.log(
        '[PrismaService] Desconectado do banco de dados (beforeExit).',
      );
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(
      '[PrismaService] Desconectado do banco de dados (onModuleDestroy).',
    );
  }
}
