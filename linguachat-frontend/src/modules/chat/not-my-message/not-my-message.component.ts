import { Component, Input } from '@angular/core';
import { Message } from 'src/models/message.types';

@Component({
  selector: 'app-not-my-message',
  templateUrl: './not-my-message.component.html',
  styleUrls: ['./not-my-message.component.sass']
})
export class NotMyMessageComponent {
  @Input() message: Message | null = null;
}
