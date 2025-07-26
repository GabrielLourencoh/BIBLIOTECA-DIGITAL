import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateAutorUseCase } from '../../use-cases/update-autor.use-case';
import { UpdateAutorDto } from '../dtos/inputs/update-autor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autores')
@Controller('autores')
export class UpdateAutorController {
  constructor(private readonly updateAutorUseCase: UpdateAutorUseCase) {}

  @ApiOperation({ summary: 'Atualizar um autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAutorDto: UpdateAutorDto,
  ) {
    const autorAtualizado = await this.updateAutorUseCase.execute(
      id,
      updateAutorDto,
    );

    return autorAtualizado;
  }
}
