import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livro } from './entities/livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livro])], // Registra a entidade Livro para este módulo
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
