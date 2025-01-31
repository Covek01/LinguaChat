import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { chatSocketConfig } from 'src/sockets/socket-config/socket.config';

@Injectable()
export class ChatSocket extends Socket {
  constructor() {
    super(chatSocketConfig);
  }
}
