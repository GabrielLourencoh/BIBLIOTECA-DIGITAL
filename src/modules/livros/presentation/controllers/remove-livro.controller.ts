import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RemoveLivroUseCase } from '../../application/use-cases/remove-livro.use-case';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveLivroOutputDto } from '../dtos/outputs/remove-livro.output';

@ApiTags('Livros')
@Controller('livros')
export class RemoveLivroController {
  constructor(private readonly removeLivroUseCase: RemoveLivroUseCase) {}

  @ApiOperation({ summary: 'Remover um livro por ID' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Livro removido com sucesso!',
    type: RemoveLivroOutputDto,
  })
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    const livroDeleted = await this.removeLivroUseCase.execute(id);

    return livroDeleted;
  }
}
