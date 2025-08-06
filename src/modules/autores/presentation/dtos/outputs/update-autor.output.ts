import { ApiProperty } from '@nestjs/swagger';
import { Autor as DomainAutorEntity } from 'src/modules/autores/domain/entities/autor.entity';

export class UpdateAutorOutputDto {
  @ApiProperty({
    example: 'Autor atualizado com sucesso!',
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
