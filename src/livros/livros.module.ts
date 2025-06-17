import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosController } from './livros.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Livro } from './entities/livro.entity';
// import { Autor } from 'src/autores/entities/autor.entity';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Livro, Autor])
    PrismaModule,
  ], // Registra a entidade Livro e Autor para este módulo
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
