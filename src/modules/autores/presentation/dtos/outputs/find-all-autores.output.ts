import { ApiProperty } from '@nestjs/swagger';
import { Autor as DomainAutorEntity } from 'src/modules/autores/domain/entities/autor.entity';

export class FindAllAutoresOutputDto {
  @ApiProperty({ example: 10, description: 'Quantidade total de autores' })
  total: number;

  @ApiProperty({
    type: [DomainAutorEntity],
    description: 'Lista de autores encontrados.',
  })
  autores: DomainAutorEntity[];

  constructor(total: number, autores: DomainAutorEntity[]) {
    this.total = total;
    this.autores = autores;
  }
}
