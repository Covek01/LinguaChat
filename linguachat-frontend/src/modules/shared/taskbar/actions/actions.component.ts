import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.sass']
})
export class ActionsComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  
  requestToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
