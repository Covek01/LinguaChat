import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkModeEnabled } from 'src/store/dark-mode/dark-mode.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {
  darkMode$: Observable<boolean> = this.store.select(selectDarkModeEnabled); 
  constructor(private store: Store) {
  }
}
