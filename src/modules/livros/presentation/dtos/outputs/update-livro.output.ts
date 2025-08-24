import { ApiProperty } from '@nestjs/swagger';
import { Livro as DomainLivroEntity } from 'src/modules/livros/domain/entities/livro.entity';

export class UpdateLivroOutputDto {
  @ApiProperty({
    example: 'Livro atualizado com sucesso!',
    description: 'Mensagem de status da operação.',
  })
  message: string;

  @ApiProperty({
    type: [DomainLivroEntity],
    description: 'O Livro que foi atualizado.',
  })
  livro: DomainLivroEntity;

  constructor(message: string, livro: DomainLivroEntity) {
    this.message = message;
    this.livro = livro;
  }
}
