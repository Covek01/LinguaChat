import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from 'src/models/message.types';
import { ChatSocket } from 'src/sockets/chat.socket';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseAddress: string;
  private basePath: string;

  constructor(private socket: ChatSocket, private http: HttpClient) {
    this.baseAddress = environment.postgresAddress;
    this.basePath = 'chat'; // Adjust path as needed
  }

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

  join(userId: number) {
    this.socket.emit('join', userId);
  }

  leave(userId: number) {
    this.socket.emit('leave', userId);
  }

  isMessage(message: Message | string): boolean {
    return typeof message !== 'string' && 'toId' in message;
  }

  loadMessages(
    room: string,
    limit: number = 10,
    offset: number = 0
  ): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.baseAddress}/${this.basePath}/loadMessages/${room}/${limit}/${offset}`
    );
  }
}
