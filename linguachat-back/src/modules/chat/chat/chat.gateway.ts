import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/models/message.types';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('send-message')
  handleSendMessage(client: Socket, @MessageBody() message: Message): Message {
    this.server
      .to(this.chatService.getKeyOfConnectedUser(message.toId))
      .emit('receive-message', message);
      
    return message;
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, @MessageBody() userId: number): string {
    this.server.sockets.sockets.set(
      this.chatService.getKeyOfConnectedUser(userId),
      client,
    );

    return 'User has joined';
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, @MessageBody() userId: number): string {
    this.server.sockets.sockets.delete(
      this.chatService.getKeyOfConnectedUser(userId),
    );

    return 'User has leaved';
  }
}
