import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CreateLivroController } from './application/presentation/controllers/create-livro.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroUseCase } from './application/use-cases/create-livro.use-case';
import { LivroRepository } from './application/domain/repositories/livro.repository';
import { PrismaLivroRepository } from './application/infra/prisma/prisma-livro.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CreateLivroController],
  providers: [
    PrismaService,
    CreateLivroUseCase,
    {
      provide: LivroRepository,
      useClass: PrismaLivroRepository,
    },
  ],
})
export class LivrosModule {}
