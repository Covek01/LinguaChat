import { Component, Input } from '@angular/core';
import { Message } from 'src/models/message.types';

@Component({
  selector: 'app-my-message',
  templateUrl: './my-message.component.html',
  styleUrls: ['./my-message.component.sass']
})
export class MyMessageComponent {
  @Input() message: Message | null = null;
}
