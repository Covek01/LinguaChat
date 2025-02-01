import { Component, Input } from '@angular/core';
import { Message } from 'src/models/message.types';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.sass']
})
export class MessageListComponent {
  @Input() messages: Message[] = [];
  
  
}
