import { Module } from '@nestjs/common';
import { createClient } from '@redis/client';
import { RedisRepository } from '../repositories/redis.repository';

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: process.env.REDIS_URL,
      },
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string }) => {
        const client = createClient(options);
        await client.connect();
        return client;
      },
    },
    RedisRepository,
  ],
  exports: [RedisRepository],
})
export class RedisModule {}
