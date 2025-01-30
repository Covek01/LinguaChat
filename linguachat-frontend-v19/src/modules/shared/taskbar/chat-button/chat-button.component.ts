import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrls: ['./chat-button.component.sass'],
})
export class ChatButtonComponent {
  constructor(private readonly router: Router) {}

  navigateChat(): void {
    this.router.navigate([`/chat/0`]).then(
      (nav) => {
        console.log(nav);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
