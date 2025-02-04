import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { off } from 'process';
import { Message } from 'src/models/message.types';

@Injectable()
export class ChatService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  getKeyOfConnectedUser(id: number): string {
    return 'user:' + id;
  }

  async getHello(): Promise<string> {
    const proba = await this.redis.get('mykey');
    console.log(proba);

    return proba;
  }

  async loadMessages(
    room: string,
    limit: number,
    offset: number,
  ): Promise<Message[]> {
    const key: string = room;
    const start: number = offset;
    const stop: number = offset + limit;
    const messagesString: string[] = await this.redis.lrange(key, start, stop);
    console.log(messagesString);

    const messages: Message[] = messagesString.map(
      (messageString: string): Message => JSON.parse(messageString),
    );

    return messages;
  }

  async addMessage(room: string, message: Message): Promise<string> {
    const messageJsonString: string = JSON.stringify(message);
    const proba = await this.redis.lpush(room, messageJsonString);
    console.log(proba);

    return 'Message added successfully';
  }
}
