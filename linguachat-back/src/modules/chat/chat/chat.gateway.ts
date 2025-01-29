import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Message } from 'src/models/message.types';

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: Message): Message {
    return message;
  }
}
