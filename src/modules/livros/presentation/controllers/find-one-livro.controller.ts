import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FindOneLivroUseCase } from '../../application/use-cases/find-one-livro.use-case';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindOneLivroOutputDto } from '../dtos/outputs/find-one-livro.output';

@ApiTags('Livros')
@Controller('livros')
export class FindOneLivroController {
  constructor(private readonly findOneLivroUseCase: FindOneLivroUseCase) {}

  @ApiOperation({ summary: 'Buscar um livro por ID' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Livro encontrado com sucesso!',
    type: FindOneLivroOutputDto,
  })
  @Get(':id')
  async handel(@Param('id', ParseIntPipe) id: number) {
    const livro = await this.findOneLivroUseCase.execute(id);

    return livro;
  }
}
