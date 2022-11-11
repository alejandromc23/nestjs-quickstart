import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { RedisRepository } from '../repositories/redis.repository';

@Injectable()
export class SaveRecentMessagesService {
  @Inject(RedisRepository)
  readonly cacheRepository: RedisRepository;
  readonly logger = new Logger(SaveRecentMessagesService.name);

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async saveRecentNewMessages(): Promise<void> {
    const messages = this.getRecentMessages();


    await Promise.all(
      messages.map(
        async ({ user, text }) => await this.cacheRepository.save(user, text),
      ),
    );

    this.logger.log('Saved messages!');
  }

  private getRecentMessages(): Array<{ user: string, text: string }> {
    return [{
      user: 'Alejandro Mascort Colomer',
      text: 'Hello this is a taste from Nestjs'
    }]
  }
}
