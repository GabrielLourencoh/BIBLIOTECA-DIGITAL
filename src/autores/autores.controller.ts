import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutorDto } from './dto/create-autor.dto';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autoresService.create(createAutorDto);
  }

  @Get('/todos/')
  findAll() {
    return this.autoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.autoresService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAutoreDto: UpdateAutoreDto) {
  //   return this.autoresService.update(+id, updateAutoreDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.autoresService.remove(+id);
  // }
}
