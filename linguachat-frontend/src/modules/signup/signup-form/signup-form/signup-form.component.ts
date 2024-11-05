import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { UserInsertDto, UserInsertDtoWithPasswordReset } from 'src/models/user.types';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.sass']
})
export class SignupFormComponent {
  baseFrontendUrl: string = environment.frontendAddress;
  loginForm: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      born: [new Date(), Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }



  onUserSignupSubmit() {
    const loginValue: UserInsertDtoWithPasswordReset = this.loginForm.value;

    if (loginValue.password !== loginValue.confirmPassword) {
      console.log("PASSWORD AND PASSWORD RESET AREN'T THE SAME");
      return;
    }

    const {confirmPassword, ...user} = loginValue; 
  }
}
