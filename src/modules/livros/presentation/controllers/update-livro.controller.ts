import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateLivroUseCase } from '../../application/use-cases/update-livro.use-case';
import { UpdateLivroDto } from '../dtos/inputs/update-livro.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Livros')
@Controller('livros')
export class UpdateLivroController {
  constructor(private readonly updateLivroUseCase: UpdateLivroUseCase) {}

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
