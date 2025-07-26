import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemoveAutorUseCase } from '../../use-cases/remove-autor.use-case';

@ApiTags('Autores')
@Controller('autores')
export class RemoveAutorController {
  constructor(private readonly removeAutorUseCase: RemoveAutorUseCase) {}

  @ApiOperation({ summary: 'Remover um autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    const autorDeleted = await this.removeAutorUseCase.execute(id);

    return {
      autorDeleted,
    };
  }
}
