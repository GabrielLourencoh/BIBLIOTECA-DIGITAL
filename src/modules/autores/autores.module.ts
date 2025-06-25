import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Autor } from './entities/autor.entity';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Autor])
    PrismaModule,
  ], // Registra a entidade Autor para este módulo
  controllers: [AutoresController],
  providers: [AutoresService],
  exports: [AutoresService],
})
export class AutoresModule {}
