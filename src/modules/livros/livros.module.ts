import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CreateLivroController } from './application/presentation/controllers/create-livro.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroUseCase } from './application/use-cases/create-livro.use-case';
import { LivroRepository } from './application/domain/repositories/livro.repository';
import { PrismaLivroRepository } from './application/infra/prisma/prisma-livro.repository';
import { FindAllLivroController } from './application/presentation/controllers/find-all-livro.controller';
import { FindAllLivroUseCase } from './application/use-cases/find-all-livro.use-case';

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
