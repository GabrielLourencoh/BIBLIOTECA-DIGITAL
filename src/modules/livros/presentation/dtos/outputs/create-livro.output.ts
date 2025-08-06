import { ApiProperty } from '@nestjs/swagger';
import { Livro as DomainLivroEntity } from 'src/modules/livros/domain/entities/livro.entity';

export class CreateLivroOutputDto {
  @ApiProperty({
    example: 'Autor criado com sucesso!',
    description: 'Mensagem de status da operação.',
  })
  message: string;

  @ApiProperty({
    type: DomainLivroEntity,
    description: 'Autor criado com sucesso!',
  })
  livro: DomainLivroEntity;

  constructor(message: string, livro: DomainLivroEntity) {
    this.livro = livro;
    this.message = message;
  }
}
