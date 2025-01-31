import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/models/message.types';
import { ChatSocket } from 'src/sockets/chat.socket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: ChatSocket) {}

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.connect();
  }

  onEvent(eventName: string): Observable<string | Message> {
    return this.socket.fromEvent(eventName);
  }

  sendMessage(message: Message): Message {
    this.socket.emit('send-message', message);

    return message;
  }

  isMessage(message: Message | string): boolean {
    return typeof message !== 'string' && 'toId' in message; 
  }
}
