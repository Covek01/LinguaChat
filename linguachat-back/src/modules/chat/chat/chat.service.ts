import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    getKeyOfConnectedUser(id: number): string {
        return 'user:' + id;
    }
}
