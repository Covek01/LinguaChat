import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/models/message.types';
import { ChatService } from './chat.service';
import { chatConfig } from './chat.config';

@WebSocketGateway(chatConfig.port, {cors: {
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST'], 
  credentials: true, 
}})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('send-message')
  handleSendMessage(client: Socket, message: Message): Message {
    const receiver: Socket = this.server.sockets.sockets.get(
      this.chatService.getKeyOfConnectedUser(message.toId),
    );
    console.log(receiver);
    if (receiver !== null && receiver !== undefined) {
      receiver.emit('receive-message', message);
    }
    client.emit('sent-message', message);

    return message;
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: number): void {
    try {
      this.server.sockets.sockets.set(
        this.chatService.getKeyOfConnectedUser(userId),
        client,
      );

      client.emit('joined', userId);
    } catch (err) {
      client.emit('error', err);
    }
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, userId: number): string {
    this.server.sockets.sockets.delete(
      this.chatService.getKeyOfConnectedUser(userId),
    );

    return 'User has leaved';
  }
}
