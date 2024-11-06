import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInsertDto, UserInsertDtoWithPasswordReset } from 'src/models/user.types';
import { sendSignupRequest } from 'src/store/signup/signup.actions';
import { selectSignupResponse } from 'src/store/signup/signup.selector';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.sass']
})
export class SignupFormComponent {
  baseFrontendUrl: string = environment.frontendAddress;
  signupForm: FormGroup;

  listenWhenSignupOccurs$ = this.store.select(selectSignupResponse)
    .pipe(filter(response => !!response))
    .subscribe(token => {
      console.log("I AM INVOKED MY FRIEND FOR SIGNUP");
      this.router.navigate(['/auth/login'])
        .then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });
    })

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.signupForm = this.formBuilder.group({
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
    const loginValue: UserInsertDtoWithPasswordReset = this.signupForm.value;

    if (loginValue.password !== loginValue.confirmPassword) {
      console.log("PASSWORD AND PASSWORD RESET AREN'T THE SAME");
      return;
    }

    const {confirmPassword, ...user} = loginValue; 

    this.store.dispatch(sendSignupRequest({user: user}));
  }
}
