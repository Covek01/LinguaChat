import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, filter, of, skip } from 'rxjs';
import { LoginService } from 'src/services/login.service';
import { UserService } from 'src/services/user.service';
import { sendLogoutRequest } from 'src/store/login/login.actions';
import { selectLoginResponse } from 'src/store/login/login.selector';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.sass'],
})
export class ActionsComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly store: Store,
    private readonly loginService: LoginService
  ) {}

  logoutSubscription$ = this.store
    .select(selectLoginResponse)
    .pipe(
      skip(1),
      filter((loggedIn) => loggedIn === false)
    )
    .subscribe((loggedIn) => {
      this.router.navigate(['/auth/login']).then(
        (nav) => {
          console.log(nav);
        },
        (err) => {
          console.log(err);
        }
      );
    });

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

  handleLogout(): void {
    this.store.dispatch(sendLogoutRequest());
    this.loginService
      .logout()
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      )
      .subscribe(() => {
        this.router.navigate([`/auth/login`]).then(
          (nav) => {
            console.log(nav);
          },
          (err) => {
            console.log(err);
          }
        );
      });
    console.log('CURRENT URL');
    console.log(this.router.url);
  }
}
