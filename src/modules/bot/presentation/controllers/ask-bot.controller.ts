import { AskBotUseCase } from '@/modules/bot/application/use-cases/ask-bot.use-case';
import { AskBotDto } from '@/modules/bot/presentation/dtos/inputs/ask-bot.dto';
import { AskBotOutputDto } from '@/modules/bot/presentation/dtos/outputs/ask-bot-output.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Bot')
@Controller('bot')
export class AskBotController {
  constructor(private readonly askBotUseCase: AskBotUseCase) {}

  @Post('/ask')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enviar uma pergunta ao bot da Biblioteca Digital' })
  @ApiResponse({ status: 200, description: 'Resposta gerada com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiOkResponse({
    description: 'Resposta retornada pelo bot',
    type: AskBotOutputDto,
  })
  async ask(@Body() dto: AskBotDto) {
    const result = await this.askBotUseCase.execute(dto);

    return new AskBotOutputDto(result.bot);
  }
}
