import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RedisRepository {
  @Inject('REDIS_CLIENT')
  readonly redisClient: any;
  readonly logger = new Logger(RedisRepository.name);

  async save(key: string, value: string): Promise<void> {
    try {
      await this.redisClient.set(key, value);
    } catch (e) {
      this.logger.error('Redis key not saved due to an error :(', {
        metadata: {
          key,
          value,
        },
      });
    }
  }
}
