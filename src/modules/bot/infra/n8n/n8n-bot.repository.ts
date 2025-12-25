import { Bot } from '@/modules/bot/domain/entities/bot.entity';
import { BotRepository } from '@/modules/bot/domain/repositories/bot.repository';
import { BotMapper } from '@/modules/bot/infra/mappers/bot.mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class N8nBotRepository implements BotRepository {
  constructor(private readonly configService: ConfigService) {}

  async ask(message: string): Promise<Bot> {
    const url = this.configService.getOrThrow<string>('N8N_WEBHOOK_URL');
    const token = this.configService.getOrThrow<string>('N8N_API_SECRET');

    const response = await axios.post(
      url,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return BotMapper.toDomain(message, response.data);
  }
}
