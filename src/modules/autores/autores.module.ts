import { Module } from '@nestjs/common';
// import { AutoresService } from './autores.service';
// import { AutoresController } from './autores.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Autor } from './entities/autor.entity';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateAutorController } from './application/presentation/controllers/create-autor.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAutorUseCase } from './application/use-cases/create-autor.use-case';
import { AutorRepository } from './application/domain/repositories/autor.repository';
import { PrismaAutorRepository } from './application/infra/prisma/prisma-autor.repository';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Autor])
    PrismaModule,
  ], // Registra a entidade Autor para este módulo
  controllers: [CreateAutorController],
  providers: [
    PrismaService,
    CreateAutorUseCase,
    {
      provide: AutorRepository,
      useClass: PrismaAutorRepository,
    },
  ],
})
export class AutoresModule {}
