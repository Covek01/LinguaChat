import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

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
}
