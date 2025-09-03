import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from 'src/modules/autores/autores.module';
import { LivrosModule } from 'src/modules/livros/livros.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    AuthModule,
    HealthModule,
    AutoresModule,
    LivrosModule,
    AutoresModule,
  ],
})
export class AppModule {}
