import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroUseCase } from './application/use-cases/create-livro.use-case';
import { LivroRepository } from './domain/repositories/livro.repository';
import { PrismaLivroRepository } from './infra/prisma/prisma-livro.repository';
import { FindAllLivroUseCase } from './application/use-cases/find-all-livro.use-case';
import { CreateLivroController } from './presentation/controllers/create-livro.controller';
import { FindAllLivroController } from './presentation/controllers/find-all-livro.controller';
import { FindOneLivroUseCase } from './application/use-cases/find-one-livro.use-case';
import { FindOneLivroController } from './presentation/controllers/find-one-livro.controller';
import { UpdateLivroController } from './presentation/controllers/update-livro.controller';
import { UpdateLivroUseCase } from './application/use-cases/update-livro.use-case';
import { RemoveLivroController } from './presentation/controllers/remove-livro.controller';
import { RemoveLivroUseCase } from './application/use-cases/remove-livro.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateLivroController,
    FindAllLivroController,
    FindOneLivroController,
    UpdateLivroController,
    RemoveLivroController,
  ],
  providers: [
    PrismaService,
    CreateLivroUseCase,
    FindAllLivroUseCase,
    FindOneLivroUseCase,
    UpdateLivroUseCase,
    RemoveLivroUseCase,
    {
      provide: LivroRepository,
      useClass: PrismaLivroRepository,
    },
  ],
})
export class LivrosModule {}
