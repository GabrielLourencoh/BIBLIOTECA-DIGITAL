/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Bot as DomainBot } from '@/modules/bot/domain/entities/bot.entity';

export class BotMapper {
  static toDomain(question: string, n8nRawResponse: any): DomainBot {
    const answer = n8nRawResponse.data.reply;

    return new DomainBot(question, answer, new Date());
  }
}
