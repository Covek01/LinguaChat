import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-search-button',
  templateUrl: './profile-search-button.component.html',
  styleUrls: ['./profile-search-button.component.sass'],
})
export class ProfileSearchButtonComponent {
  constructor(private readonly router: Router) {}

  navigateProfileSearch(): void {
    this.router.navigate([`/search`]).then(
      (nav) => {
        console.log(nav);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
