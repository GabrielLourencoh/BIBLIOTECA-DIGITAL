import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma.service';
import { CreateAutorUseCase } from './application/use-cases/create-autor.use-case';
import { AutorRepository } from './domain/repositories/autor.repository';
import { PrismaAutorRepository } from './infra/prisma/prisma-autor.repository';
import { FindAllAutorUseCase } from './application/use-cases/find-all-autor.use-case';
import { FindOneAutorUseCase } from './application/use-cases/find-one-autor.use-case';
import { UpdateAutorUseCase } from './application/use-cases/update-autor.use-case';
import { RemoveAutorUseCase } from './application/use-cases/remove-autor.use-case';
import { CreateAutorController } from './presentation/controllers/create-autor.controller';
import { FindAllAutorController } from './presentation/controllers/find-all-autor.controller';
import { FindOneAutorController } from './presentation/controllers/find-one-autor.controller';
import { UpdateAutorController } from './presentation/controllers/update-autor.controller';
import { RemoveAutorController } from './presentation/controllers/remove-autor.controller';
import { AutorMapper } from './mappers/autor.mapper';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [
    CreateAutorController,
    FindAllAutorController,
    FindOneAutorController,
    UpdateAutorController,
    RemoveAutorController,
  ],
  providers: [
    PrismaService,
    CreateAutorUseCase,
    FindAllAutorUseCase,
    FindOneAutorUseCase,
    UpdateAutorUseCase,
    RemoveAutorUseCase,
    {
      provide: AutorRepository,
      useClass: PrismaAutorRepository,
    },
    AutorMapper,
  ],
  exports: [AutorRepository],
})
export class AutoresModule {}
