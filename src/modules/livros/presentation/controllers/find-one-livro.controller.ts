import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOneLivroUseCase } from '../../application/use-cases/find-one-livro.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Livros')
@Controller('livros')
export class FindOneLivroController {
  constructor(private readonly findOneLivroUseCase: FindOneLivroUseCase) {}

  @Get(':id')
  async handel(@Param('id', ParseIntPipe) id: number) {
    const livro = await this.findOneLivroUseCase.execute(id);

    return livro;
  }
}
