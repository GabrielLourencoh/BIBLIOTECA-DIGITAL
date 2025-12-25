import { AskBotUseCase } from '@/modules/bot/application/use-cases/ask-bot.use-case';
import { BotRepository } from '@/modules/bot/domain/repositories/bot.repository';
import { N8nBotRepository } from '@/modules/bot/infra/n8n/n8n-bot.repository';
import { AskBotController } from '@/modules/bot/presentation/controllers/ask-bot.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AskBotController],
  providers: [
    AskBotUseCase,
    {
      provide: BotRepository,
      useClass: N8nBotRepository,
    },
  ],
})
export class BotModule {}
