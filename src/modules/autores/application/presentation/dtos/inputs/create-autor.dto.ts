import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';

export class CreateAutorDto {
  @IsString({ message: 'O nome não pode estar vazio.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @MinLength(3, { message: 'A nome deve ter no mínimo 3 caracteres.' })
  @MaxLength(100, {
    message: 'A nome deve ter no máximo 100 caracteres.',
  })
  @ApiProperty({ example: 'Gabriel Lourenço' })
  nome: string;

  @IsString({ message: 'A senha não pode estar vazio.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazio.' })
  @MinLength(5, { message: 'A senha deve ter no mínimo 5 caracteres.' })
  @MaxLength(100, {
    message: 'A senha deve ter no máximo 20 caracteres.',
  })
  @ApiProperty({ example: 'Minha_senha-foSrte@123' })
  password: string;

  @IsString({ message: 'O CPF deve ser uma sequência de caracteres.' })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio.' })
  //    @Transform: Remove caracteres não-dígitos PRIMEIRO.
  //    Ex: "123.456.789-01" vira "12345678901"
  //    Ex: "123" continua "123"
  @Transform(({ value }) => (value as string).replace(/\D/g, ''))
  //    @Length: Valida o comprimento da string APÓS a transformação.
  //    Agora, espera-se que a string JÁ esteja limpa e com 11 dígitos.
  @Length(11, 11, {
    message: 'O CPF deve ter exatamente 11 dígitos numéricos.', // Mensagem mais concisa
  })
  @ApiProperty({ example: '12312312312' })
  cpf: string;

  @IsString({ message: 'A nacionalidade não pode estar vazio.' })
  @IsNotEmpty({ message: 'A nacionalidade não pode estar vazio.' })
  @MinLength(4, { message: 'A nacionalidade deve ter no mínimo 4 caracteres.' })
  @MaxLength(100, {
    message: 'A nacionalidade deve ter no máximo 100 caracteres.',
  })
  @ApiProperty({ example: 'Brasileiro' })
  nacionalidade: string;

  @IsNumber({}, { message: 'A idade do autor deve ser um número válido.' })
  @IsPositive({ message: 'A idade precisa ser positiva.' })
  @Min(18, { message: 'O autor precisa ter no mínimo 18 anos.' })
  @IsNotEmpty({ message: 'a idade não pode estar vazia.' })
  @ApiProperty({ example: 22 })
  idade: number;
}
