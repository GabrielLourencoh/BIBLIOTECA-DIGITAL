import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateLivroDto {
  @IsString({ message: 'O título não pode estar vazio.' })
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres.' })
  @MaxLength(100, {
    message: 'O título deve ter no máximo 100 caracteres.',
  })
  @ApiProperty({ example: 'Os 7 monstrinhos' })
  titulo: string;

  @IsString({ message: 'O IBSN não pode estar vazio.' })
  @MinLength(10, { message: 'O ISBN pode ter no mínimo 10 caracteres' })
  @MaxLength(13, { message: 'O ISBN pode ter no máximo 13 caracteres' })
  @IsNotEmpty({ message: 'O ISBN não pode estar vazio.' })
  @ApiProperty({ example: '12345678999' })
  isbn: string;

  @IsString({ message: 'O gênero não pode estar vazio.' })
  @IsNotEmpty({ message: 'O gênero não pode estar vazio.' })
  @MinLength(5, { message: 'O gênero deve ter no mínimo 5 caracteres.' })
  @MaxLength(40, {
    message: 'O gênero deve ter no máximo 40 caracteres.',
  })
  @ApiProperty({ example: 'Romance' })
  genero: string;

  @IsNumber(
    {},
    { message: 'O ano da publicação do livro deve ser um número válido.' },
  )
  @IsPositive({ message: 'O ano da publicação do livro precisa ser positiva.' })
  @Max(2026, {
    message:
      'O ano da publicação do livro precisa ser publicado no ano de 2025 para trás',
  })
  @IsNotEmpty({ message: 'O ano da publicação não pode estar vazia.' })
  @ApiProperty({ example: 2025 })
  anoPublicacao: number;

  @IsNumber(
    {},
    { message: 'A quantidade de páginas do livro deve ser um número válido.' },
  )
  @IsPositive({
    message: 'A quantidade de páginas do livro precisa ser positiva.',
  })
  @Min(1, { message: 'O livro precisa ter no mínimo uma página' })
  @IsNotEmpty({ message: 'A quantidade de páginas não pode estar vazia.' })
  @ApiProperty({ example: 50 })
  paginas: number;

  @IsNumber({}, { message: 'O ID do autor deve ser um número válido.' })
  @IsPositive({ message: 'O ID do autor precisa ser um número positivo.' })
  @IsNotEmpty({ message: 'O ID do autor não pode estar vazio.' })
  @ApiProperty({ example: 1 })
  autorId: number; // Campo que recebe o ID do autor
}
