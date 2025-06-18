import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  // Principais STATUS
  // @ApiResponse({ status: 200, ... }): para sucesso comum (GET, PATCH)
  // @ApiResponse({ status: 201, ... }): para criação (POST)
  // @ApiResponse({ status: 204, ... }): para sucesso sem retorno (DELETE)
  // @ApiResponse({ status: 404, ... }): para "não encontrado"
  // @ApiResponse({ status: 409, ... }): para conflitos (ex: CPF duplicado)

  @Post()
  @ApiOperation({ summary: 'Criar um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso' })
  @ApiResponse({ status: 409, description: 'ISBN duplicado' })
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livrosService.create(createLivroDto);
  }

  @Get('/todos/')
  @ApiOperation({ summary: 'Listar todos os livros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de livros retornada com sucesso',
  })
  findAll() {
    return this.livrosService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um livro por ID' })
  @ApiResponse({ status: 200, description: 'Livro encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.livrosService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um livro por ID' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    return this.livrosService.update(+id, updateLivroDto);
  }

  @ApiOperation({ summary: 'Remover um livro por ID' })
  @ApiResponse({ status: 200, description: 'Livro removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livrosService.remove(+id);
  }
}
