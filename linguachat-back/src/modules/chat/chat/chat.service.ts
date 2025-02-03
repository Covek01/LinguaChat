import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    constructor() {}

    getKeyOfConnectedUser(id: number): string {
        return 'user:' + id;
    }

}
