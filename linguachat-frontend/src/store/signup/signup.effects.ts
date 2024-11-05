import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { LoginService } from "src/services/login.service";
import * as SignupActions from "./signup.actions";

@Injectable()
export class SignupEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  login$ = createEffect(() => 
    this.actions$.pipe(
        ofType(SignupActions.sendSignupRequest),
        exhaustMap((action) => 
            this.loginService.signup(action.user)
            .pipe(
                map(response => SignupActions.getSignupResponse({response: response})),
                catchError(error => of(SignupActions.getSignupError({error: 'Signup error'})))
            )
    )
    ))
}
