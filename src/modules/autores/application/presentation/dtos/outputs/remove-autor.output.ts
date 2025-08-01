import { ApiProperty } from '@nestjs/swagger';
import { Autor as DomainAutorEntity } from '../../../domain/entities/autor.entity';

export class RemoveAutorOutputDto {
  @ApiProperty({
    example: 'Autor removido com sucesso!',
    description: 'Mensagem de status da operação.',
  })
  message: string;

  @ApiProperty({
    type: [DomainAutorEntity],
    description: 'Autor encontrado',
  })
  autor: DomainAutorEntity;

  constructor(message: string, autor: DomainAutorEntity) {
    this.message = message;
    this.autor = autor;
  }
}
