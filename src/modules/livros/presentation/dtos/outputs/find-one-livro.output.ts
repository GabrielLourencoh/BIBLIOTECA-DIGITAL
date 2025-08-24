import { ApiProperty } from '@nestjs/swagger';
import { Livro as DomainLivroEntity } from 'src/modules/livros/domain/entities/livro.entity';

export class FindOneLivroOutputDto {
  @ApiProperty({
    example: 'Livro encontrado com sucesso!',
    description: 'Mensagem de status da operação.',
  })
  message: string;

  @ApiProperty({
    type: [DomainLivroEntity],
    description: 'Livro encontrado',
  })
  livro: DomainLivroEntity;

  constructor(message: string, livro: DomainLivroEntity) {
    this.livro = livro;
    this.message = message;
  }
}
