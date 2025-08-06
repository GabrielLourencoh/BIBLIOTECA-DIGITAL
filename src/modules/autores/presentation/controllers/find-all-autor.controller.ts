import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllAutoresOutputDto } from '../dtos/outputs/find-all-autores.output';
import { FindAllAutorUseCase } from '../../application/use-cases/find-all-autor.use-case';

@ApiTags('Autores')
@Controller('autores')
export class FindAllAutorController {
  constructor(private readonly findAllAutorUseCase: FindAllAutorUseCase) {}

  @ApiOperation({ summary: 'Listar todos os autores' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Autores encontrados com sucesso!',
    type: FindAllAutoresOutputDto,
  })
  @Get('/todos')
  async handle() {
    // Delega a lógica de busca para o Use Case.
    const autores = await this.findAllAutorUseCase.execute();

    return autores;
  }
}
