import { Bot } from '@/modules/bot/domain/entities/bot.entity';

export abstract class BotRepository {
  abstract ask(message: string): Promise<Bot>;
}
