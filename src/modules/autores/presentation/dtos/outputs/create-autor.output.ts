import { ApiProperty } from '@nestjs/swagger';
import { Autor as DomainAutorEntity } from 'src/modules/autores/domain/entities/autor.entity';

export class CreateAutorOutputDto {
  @ApiProperty({
    example: 'Autor criado com sucesso!',
    description: 'Mensagem de status da operação.',
  })
  message: string;

  @ApiProperty({
    type: DomainAutorEntity,
    description: 'O Autor criado.',
  })
  autor: DomainAutorEntity;

  constructor(message: string, autor: DomainAutorEntity) {
    this.autor = autor;
    this.message = message;
  }
}
