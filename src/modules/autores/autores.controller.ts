import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Livros') // Agrupando os endpoints no Swagger
@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  // Principais STATUS
  // @ApiResponse({ status: 200, ... }): para sucesso comum (GET, PATCH)
  // @ApiResponse({ status: 201, ... }): para criação (POST)
  // @ApiResponse({ status: 204, ... }): para sucesso sem retorno (DELETE)
  // @ApiResponse({ status: 404, ... }): para "não encontrado"
  // @ApiResponse({ status: 409, ... }): para conflitos (ex: CPF duplicado)

  @Post()
  @ApiOperation({ summary: 'Criar um novo autor' })
  @ApiResponse({ status: 201, description: 'Autor criado com sucesso' })
  @ApiResponse({ status: 409, description: 'CPF duplicado' })
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autoresService.create(createAutorDto);
  }

  @ApiOperation({ summary: 'Listar todos os autores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de autores retornada com sucesso',
  })
  @Get('/todos/')
  findAll() {
    return this.autoresService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.autoresService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutorDto: UpdateAutorDto) {
    return this.autoresService.update(+id, updateAutorDto);
  }

  @ApiOperation({ summary: 'Remover um autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autoresService.remove(+id);
  }
}
