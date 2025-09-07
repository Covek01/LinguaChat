import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Message } from 'src/models/message.types';
import { RolesGuard } from 'src/modules/auth/authorization/roles.guard';
import { Role } from 'src/modules/auth/authorization/roles.enum';
import { Roles } from 'src/modules/auth/authorization/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User, Role.Admin)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/get')
  async getHello(): Promise<string> {
    return this.chatService.getHello();
  }

  @Get('/loadMessages/:room/:limit/:offset')
  async loadMessages(
    @Param('room') room: string,
    @Param('limit') limit: string,
    @Param('offset') offset: string,
  ): Promise<Message[]> {
    const limitNumber: number = parseInt(limit);
    const limitOffset: number = parseInt(offset);

    return this.chatService.loadMessages(room, limitNumber, limitOffset);
  }
}
