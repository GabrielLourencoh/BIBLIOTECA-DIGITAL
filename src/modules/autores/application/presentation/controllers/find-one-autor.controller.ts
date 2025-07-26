import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindOneAutorUseCase } from '../../use-cases/find-one-autor.use-case';
import { FindOneAutorOutputDto } from '../dtos/outputs/find-one-autor.output';

@ApiTags('Autores')
@Controller('autores')
export class FindOneAutorController {
  constructor(private readonly findOneAutorUseCase: FindOneAutorUseCase) {}

  @ApiOperation({ summary: 'Buscar um autor por ID' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Autores encontrados com sucesso!',
    type: FindOneAutorOutputDto,
  })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    const autor = await this.findOneAutorUseCase.execute(id);

    return autor;
  }
}
