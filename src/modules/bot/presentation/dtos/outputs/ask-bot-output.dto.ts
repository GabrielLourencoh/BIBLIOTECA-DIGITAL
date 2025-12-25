import { ApiProperty } from '@nestjs/swagger';
import { Bot } from '@/modules/bot/domain/entities/bot.entity';

export class AskBotOutputDto {
  @ApiProperty({
    example: 'Resposta gerada com sucesso.',
    description: 'Mensagem de status da operação.',
  })
  message: string;

  @ApiProperty({
    type: Bot,
    description: 'Interação registrada pelo bot.',
  })
  bot: Bot;

  constructor(bot: Bot) {
    this.message = 'Resposta gerada com sucesso.';
    this.bot = bot;
  }
}
