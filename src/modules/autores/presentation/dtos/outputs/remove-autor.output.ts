import { ApiProperty } from '@nestjs/swagger';
import { Autor as DomainAutorEntity } from 'src/modules/autores/domain/entities/autor.entity';

export class RemoveAutorOutputDto {
  @ApiProperty({
    example: 'Autor removido com sucesso!',
    description: 'Mensagem de status da operação.',
  })
  message: string;

  @ApiProperty({
    type: [DomainAutorEntity],
    description: 'O Autor removido.',
  })
  autor: DomainAutorEntity;

  constructor(message: string, autor: DomainAutorEntity) {
    this.message = message;
    this.autor = autor;
  }
}
