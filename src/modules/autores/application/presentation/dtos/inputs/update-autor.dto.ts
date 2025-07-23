import { PartialType } from '@nestjs/mapped-types';
import { CreateAutorDto } from './create-autor.dto';
import { ApiProperty } from '@nestjs/swagger';

// UpdateAutorDto herda todas as propriedades e validações de CreateAutorDto,
// mas as torna opcionais (ex: nome?: string; cpf?: string;).
export class UpdateAutorDto extends PartialType(CreateAutorDto) {
  @ApiProperty({ example: 'Gabriel Lourenço Atualizado' })
  nome?: string;

  @ApiProperty({ example: 'Minha_senha-forte@123atualizada' })
  password?: string;

  @ApiProperty({ example: '12312312390' })
  cpf?: string;

  @ApiProperty({ example: 'Canadense' })
  nacionalidade?: string;

  @ApiProperty({ example: 20 })
  idade?: number;
}
