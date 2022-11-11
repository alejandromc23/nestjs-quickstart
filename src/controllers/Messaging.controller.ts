import { Controller, Get, Post } from '@nestjs/common';

import { SaveRecentMessagesService } from '../services/SaveRecentMessages.service';

@Controller('messages')
export class MessagingController {
  constructor(private readonly linkedinService: SaveRecentMessagesService) {}

  @Post('recent')
  async saveRecentMessages(): Promise<void> {
    return await this.linkedinService.saveRecentNewMessages();
  }
}
