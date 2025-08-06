import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLivroDto } from './create-livro.dto';

export class UpdateLivroDto extends PartialType(CreateLivroDto) {
  @ApiProperty({ example: 'Os 7 monstrinhos Atualizado' })
  titulo?: string;

  @ApiProperty({ example: '12345678900' })
  isbn?: string;

  @ApiProperty({ example: 'Ficção científica' })
  genero?: string;

  @ApiProperty({ example: 2021 })
  anoPublicacao?: number;

  @ApiProperty({ example: 200 })
  paginas?: number;

  @ApiProperty({ example: 3 })
  autorId?: number;
}
