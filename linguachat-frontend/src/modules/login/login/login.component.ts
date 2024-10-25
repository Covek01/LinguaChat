import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkModeEnabled } from 'src/store/dark-mode/dark-mode.selector';
import { DarkMode } from 'src/store/dark-mode/dark-mode.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  darkMode$: Observable<boolean> = this.store.select(selectDarkModeEnabled); 
  constructor(private store: Store) {
  }
}
