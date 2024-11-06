import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { LoginService } from "src/services/login.service";
import * as SignupActions from "./signup.actions";

@Injectable()
export class SignupEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  signup$ = createEffect(() => 
    this.actions$.pipe(
        ofType(SignupActions.sendSignupRequest),
        exhaustMap((action) => 
            this.loginService.signup(action.user)
            .pipe(
                tap(response => console.log('Signup Response:', response)),
                map(response =>  {
                    console.log("RESPONSE IS " + response)
                    if (typeof response === 'string' && response === 'User added successfully')
                    {
                        return SignupActions.getSignupResponse({response: response});
                    } else {
                        throw new Error('Unexpected response format');
                    }
                        
                }
                    ),
                catchError(error => of(SignupActions.getSignupError({error: error})))
            )
    )
    ))
}
