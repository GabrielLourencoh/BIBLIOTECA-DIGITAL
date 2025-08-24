import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateLivroUseCase } from '../../application/use-cases/update-livro.use-case';
import { UpdateLivroDto } from '../dtos/inputs/update-livro.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateLivroOutputDto } from '../dtos/outputs/update-livro.output';

@ApiTags('Livros')
@Controller('livros')
export class UpdateLivroController {
  constructor(private readonly updateLivroUseCase: UpdateLivroUseCase) {}

  @ApiOperation({ summary: 'Atualizar um livro por ID' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Livro atualizado com sucesso!',
    type: UpdateLivroOutputDto,
  })
  @Patch(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLivroDto: UpdateLivroDto,
  ) {
    const autorAtualizado = await this.updateLivroUseCase.execute(
      id,
      updateLivroDto,
    );

    return autorAtualizado;
  }
}
