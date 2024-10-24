import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.sass']
})
export class SignupFormComponent {
  baseFrontendUrl: string = environment.frontendAddress;

}
