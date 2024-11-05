import { booleanAttribute, Component, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { darkModeDisable, darkModeEnable } from 'src/store/dark-mode/dark-mode.actions';
import { selectDarkModeEnabled } from 'src/store/dark-mode/dark-mode.selector';


@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent {
  @Input() isUserLoggedIn: boolean = false;

  darkMode$ = this.store.select(selectDarkModeEnabled);
  constructor(private readonly store: Store) {

  }

  toggleChanged(event: MatSlideToggleChange) {
    const isChecked = event.checked
    console.log('Toggle is checked:', isChecked);
    if (isChecked) {
      this.store.dispatch(darkModeEnable());
    } else {
      this.store.dispatch(darkModeDisable());
    }
  }
}
