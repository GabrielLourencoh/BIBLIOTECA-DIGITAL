import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from 'src/modules/autores/autores.module';
import { LivrosModule } from 'src/modules/livros/livros.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    HealthModule,
    PrismaModule,
    AutoresModule,
    LivrosModule,
    AutoresModule,
  ],
})
export class AppModule {}
