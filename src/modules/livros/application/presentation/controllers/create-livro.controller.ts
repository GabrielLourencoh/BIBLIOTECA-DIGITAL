import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLivroUseCase } from '../../use-cases/create-livro.use-case';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateLivroDto } from '../dtos/inputs/create-livro.dto';
import { CreateLivroOutputDto } from '../dtos/outputs/create-livro.output';

@ApiTags('Livros')
@Controller('livros')
export class CreateLivroController {
  constructor(private readonly createLivroUseCase: CreateLivroUseCase) {}

  @Post('/criar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso' })
  @ApiResponse({ status: 409, description: 'ISBN duplicado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOkResponse({
    description: 'Livro criado com sucesso!',
    type: CreateLivroOutputDto,
  })
  async create(@Body() createLivroDto: CreateLivroDto) {
    // Delega a lógica de negócio para o Use Case.
    // O Use Case retorna a Entidade de Domínio Livro criada.
    return this.createLivroUseCase.execute(createLivroDto);
  }
}
