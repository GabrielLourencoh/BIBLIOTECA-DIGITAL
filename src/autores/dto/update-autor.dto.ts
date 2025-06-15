import { PartialType } from '@nestjs/mapped-types';
import { CreateAutorDto } from './create-autor.dto';

// UpdateAutorDto herda todas as propriedades e validações de CreateAutorDto,
// mas as torna opcionais (ex: nome?: string; cpf?: string;).
export class UpdateAutorDto extends PartialType(CreateAutorDto) {}
