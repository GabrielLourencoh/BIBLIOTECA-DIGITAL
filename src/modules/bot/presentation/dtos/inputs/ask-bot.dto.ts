import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AskBotDto {
  @IsString({ message: 'A mensagem deve ser um texto válido.' })
  @IsNotEmpty({ message: 'A mensagem não pode estar vazia.' })
  @MinLength(1, { message: 'A mensagem deve ter ao menos 1 caractere.' })
  @MaxLength(1000, {
    message: 'A mensagem pode ter no máximo 1000 caracteres.',
  })
  @ApiProperty({ example: 'O que é o projeto Biblioteca Digital?' })
  message: string;
}
