import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/models/message.types';
import { ChatService } from './chat.service';
import { chatConfig } from './chat.config';
import { Exception } from 'handlebars';

@WebSocketGateway(chatConfig.port, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('send-message')
  handleSendMessage(client: Socket, message: Message): Message {
    try {
      const receiver: Socket = this.server.sockets.sockets.get(
        this.chatService.getKeyOfConnectedUser(message.toId),
      );
      console.log(receiver);

      this.chatService.addMessage(message.room, message);

      if (receiver !== null && receiver !== undefined) {
        receiver.emit('receive-message', message);
      }
      client.emit('sent-message', message);

      return message;
    } catch (error) {
      console.log('ERROR SENDING MESSAGE');
      console.log(error);

      client.emit('error', error);

      throw new Error(error);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: number): void {
    try {
      this.server.sockets.sockets.set(
        this.chatService.getKeyOfConnectedUser(userId),
        client,
      );

      client.emit('joined', userId);
    } catch (error) {
      client.emit('error', error);
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
