import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroUseCase } from './application/use-cases/create-livro.use-case';
import { LivroRepository } from './domain/repositories/livro.repository';
import { PrismaLivroRepository } from './infra/prisma/prisma-livro.repository';
import { FindAllLivroUseCase } from './application/use-cases/find-all-livro.use-case';
import { CreateLivroController } from './presentation/controllers/create-livro.controller';
import { FindAllLivroController } from './presentation/controllers/find-all-livro.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CreateLivroController, FindAllLivroController],
  providers: [
    PrismaService,
    CreateLivroUseCase,
    FindAllLivroUseCase,
    {
      provide: LivroRepository,
      useClass: PrismaLivroRepository,
    },
  ],
})
export class LivrosModule {}
