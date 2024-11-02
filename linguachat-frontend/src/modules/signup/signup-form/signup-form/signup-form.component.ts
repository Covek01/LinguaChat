import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { UserInsertDto } from 'src/models/user.types';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.sass']
})
export class SignupFormComponent {
  baseFrontendUrl: string = environment.frontendAddress;
  userInputState: UserInsertDto;
  loginForm: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder
  ) {
    this.userInputState = new UserInsertDto();
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      born: [new Date(), Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    
  }
}
