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
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAutorOutputDto } from '../dtos/outputs/update-autor.output';

@ApiTags('Autores')
@Controller('autores')
export class UpdateAutorController {
  constructor(private readonly updateAutorUseCase: UpdateAutorUseCase) {}

  @ApiOperation({ summary: 'Atualizar um autor por ID' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Autor atualizado com sucesso!',
    type: UpdateAutorOutputDto,
  })
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
