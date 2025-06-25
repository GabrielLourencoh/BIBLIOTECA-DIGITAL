import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateAutorUseCase } from 'src/modules/autores/application/use-cases/create-autor.use-case';
import { CreateAutorDto } from '../dtos/inputs/create-autor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autores')
@Controller('autores')
export class CreateAutorController {
  constructor(private readonly createAutorUseCase: CreateAutorUseCase) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Criar um novo autor' })
  @ApiResponse({ status: 201, description: 'Autor criado com sucesso' })
  @ApiResponse({ status: 409, description: 'CPF duplicado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async handle(@Body() createAutorDto: CreateAutorDto) {
    const novoAutor = await this.createAutorUseCase.execute(createAutorDto);
    return novoAutor;
  }
}
