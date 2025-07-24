import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateAutorController } from './application/presentation/controllers/create-autor.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAutorUseCase } from './application/use-cases/create-autor.use-case';
import { AutorRepository } from './application/domain/repositories/autor.repository';
import { PrismaAutorRepository } from './application/infra/prisma/prisma-autor.repository';
import { FindAllAutorController } from './application/presentation/controllers/find-all-autor.controller';
import { FindAllAutorUseCase } from './application/use-cases/find-all-autor.use-case';
import { FindOneAutorController } from './application/presentation/controllers/find-one-autor.controller';
import { FindOneAutorUseCase } from './application/use-cases/find-one-autor.use-case';
import { UpdateAutorController } from './application/presentation/controllers/update-autor.controller';
import { UpdateAutorUseCase } from './application/use-cases/update-autor.use-case';
import { RemoveAutorController } from './application/presentation/controllers/remove-autor.controller';
import { RemoveAutorUseCase } from './application/use-cases/remove-autor.use-case';
import { AutorMapper } from './application/mappers/autor.mapper';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Autor])
    PrismaModule,
  ], // Registra a entidade Autor para este módulo
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
