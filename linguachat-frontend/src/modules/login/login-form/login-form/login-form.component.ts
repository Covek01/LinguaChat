import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { sendLoginRequest } from 'src/store/login/login.actions';
import { selectLoginResponse } from 'src/store/login/login.selector';
import { LoginRequest } from 'src/store/login/login.types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass'],
})
export class LoginFormComponent implements OnDestroy {
  public baseFrontendUrl: string = environment.frontendAddress;
  public username: string = '';
  public password: string = '';

  constructor(private readonly store: Store, private readonly router: Router) {}

  listenWhenLoginOccursSubscription = this.store
    .select(selectLoginResponse)
    .pipe(filter((token) => !!token))
    .subscribe((token) => {
      console.log('I AM INVOKED MY FRIEND');
      localStorage.setItem('jwtToken', token);
      this.router.navigate(['/user/myprofile']).then(
        (nav) => {
          console.log(nav); // true if navigation is successful
        },
        (err) => {
          console.log(err); // when there's an error
        }
      );
    });

  public loginSubmit($event: MouseEvent) {
    console.log(
      `Username is ${this.username} and password is ${this.password}`
    );
    const request: LoginRequest = {
      username: this.username,
      password: this.password,
    };
    this.store.dispatch(sendLoginRequest({ request }));
  }

  ngOnDestroy(): void {
    this.listenWhenLoginOccursSubscription.unsubscribe();
  }
}
