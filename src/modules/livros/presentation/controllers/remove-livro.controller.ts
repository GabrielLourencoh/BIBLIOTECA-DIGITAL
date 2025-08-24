import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { RemoveLivroUseCase } from '../../application/use-cases/remove-livro.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Livros')
@Controller('livros')
export class RemoveLivroController {
  constructor(private readonly removeLivroUseCase: RemoveLivroUseCase) {}

  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    const livroDeleted = await this.removeLivroUseCase.execute(id);

    return livroDeleted;
  }
}
