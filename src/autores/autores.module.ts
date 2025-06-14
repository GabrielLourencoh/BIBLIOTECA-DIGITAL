import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])], // Registra a entidade Autor para este módulo
  controllers: [AutoresController],
  providers: [AutoresService],
  exports: [AutoresService],
})
export class AutoresModule {}
