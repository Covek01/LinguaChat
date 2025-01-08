import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-button',
  templateUrl: './feed-button.component.html',
  styleUrls: ['./feed-button.component.sass'],
})
export class FeedButtonComponent {
  constructor(private readonly router: Router) {}

  navigateFeed(): void {
    this.router.navigate([`/feed`]).then(
      (nav) => {
        console.log(nav);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
