import { ApiProperty } from '@nestjs/swagger';
import { Livro as DomainLivroEntity } from '../../../domain/entities/livro.entity';

export class FindAllLivrosOutputdto {
  @ApiProperty({
    example: 10,
    description: 'Quantidade total de livros encontrados ',
  })
  total: number;

  @ApiProperty({
    type: DomainLivroEntity,
    description: 'Array de livros encontrados',
  })
  livros: DomainLivroEntity[];

  constructor(total: number, livros: DomainLivroEntity[]) {
    this.total = total;
    this.livros = livros;
  }
}
