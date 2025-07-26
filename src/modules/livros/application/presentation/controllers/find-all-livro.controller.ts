import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllLivroUseCase } from '../../use-cases/find-all-livro.use-case';
import { FindAllLivrosOutputdto } from '../dtos/outputs/find-all-livros.output';

@ApiTags('Livros')
@Controller('livros')
export class FindAllLivroController {
  constructor(private readonly findAllLivroUseCase: FindAllLivroUseCase) {}

  @ApiOperation({ summary: 'Listar todos os livros' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Livro criado com sucesso!',
    type: FindAllLivrosOutputdto,
  })
  @Get('/todos')
  async handle() {
    const livros = await this.findAllLivroUseCase.execute();

    return livros;
  }
}
