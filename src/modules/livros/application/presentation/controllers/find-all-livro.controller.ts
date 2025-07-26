import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllLivroUseCase } from '../../use-cases/find-all-livro.use-case';

@ApiTags('Livros')
@Controller('livros')
export class FindAllLivroController {
  constructor(private readonly findAllLivroUseCase: FindAllLivroUseCase) {}

  @ApiOperation({ summary: 'Listar todos os livros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de livros retornada com sucesso',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/todos')
  async handle() {
    const livros = await this.findAllLivroUseCase.execute();

    return livros;
  }
}
