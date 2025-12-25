import { AskBotInput } from '@/modules/bot/application/dtos/ask-bot-input.dto';
import { AskBotOutput } from '@/modules/bot/application/dtos/ask-bot-output.dto';
import { BotRepository } from '@/modules/bot/domain/repositories/bot.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AskBotUseCase {
  constructor(private readonly botRepository: BotRepository) {}

  async execute(input: AskBotInput): Promise<AskBotOutput> {
    const bot = await this.botRepository.ask(input.message);

    return {
      bot,
    };
  }
}
