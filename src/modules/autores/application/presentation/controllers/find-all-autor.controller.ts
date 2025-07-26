import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllAutorUseCase } from '../../use-cases/find-all-autor.use-case';

@ApiTags('Autores')
@Controller('autores')
export class FindAllAutorController {
  constructor(private readonly findAllAutorUseCase: FindAllAutorUseCase) {}

  @ApiOperation({ summary: 'Listar todos os autores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de autores retornada com sucesso',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/todos')
  async handle() {
    // Delega a lógica de busca para o Use Case.
    const autores = await this.findAllAutorUseCase.execute();

    return autores;
  }
}
