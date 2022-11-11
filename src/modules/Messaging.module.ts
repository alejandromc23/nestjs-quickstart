import { Module } from '@nestjs/common';
import { MessagingController } from '../controllers/Messaging.controller';
import { SaveRecentMessagesService } from '../services/SaveRecentMessages.service';
import { RedisModule } from './redis.module';

@Module({
  imports: [RedisModule],
  controllers: [MessagingController],
  providers: [SaveRecentMessagesService],
})
export class MessagingModule {}
