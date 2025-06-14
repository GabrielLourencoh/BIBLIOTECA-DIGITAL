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
  nome: string;

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
  cpf: string;

  @IsString({ message: 'A nacionalidade não pode estar vazio.' })
  @IsNotEmpty({ message: 'A nacionalidade não pode estar vazio.' })
  @MinLength(4, { message: 'A nacionalidade deve ter no mínimo 4 caracteres.' })
  @MaxLength(100, {
    message: 'A nacionalidade deve ter no máximo 100 caracteres.',
  })
  nacionalidade: string;

  @IsNumber({}, { message: 'A idade do autor deve ser um número válido.' })
  @IsPositive({ message: 'A idade precisa ser positiva.' })
  @Min(18, { message: 'O autor precisa ter no mínimo 18 anos.' })
  @IsNotEmpty({ message: 'a idade não pode estar vazia.' })
  idade: number;
}
