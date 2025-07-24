import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '12312312312',
    description: 'CPF do autor (apenas números) ',
  })
  @IsString({ message: 'O CPF deve ser uma string' })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio' })
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos númericos' })
  cpf: string;

  @ApiProperty({
    example: 'minha_senha-forte123',
    description: 'Senha do autor',
  })
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}
