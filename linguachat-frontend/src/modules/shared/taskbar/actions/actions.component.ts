import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.sass'],
})
export class ActionsComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private readonly router: Router) {}
  requestToggleSidenav() {
    this.toggleSidenav.emit();
  }

  handleHomeRoute(): void {
    this.router.navigate([`/user/myprofile`]).then(
      (nav) => {
        console.log(nav); 
      },
      (err) => {
        console.log(err); 
      }
    );
  }
}
