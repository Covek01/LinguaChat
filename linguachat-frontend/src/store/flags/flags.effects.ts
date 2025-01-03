import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FlagsActions from './flags.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { FlagsService } from 'src/services/flags.service';

@Injectable()
export class FlagsEffects {
  constructor(private actions$: Actions, private flagsService: FlagsService) {}

  getFlags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlagsActions.sendRequestToGetFlags),
      exhaustMap((action) =>
        this.flagsService.getFlags().pipe(
          tap((response) => console.log('Flags Response:', response)),
          map((flags) => {
            return FlagsActions.getResponseForFlags({
              flags,
            });
          }),
          catchError((error) => of(FlagsActions.getError({ error: error })))
        )
      )
    )
  );
}
