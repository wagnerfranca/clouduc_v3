import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, exhaustMap, map,} from 'rxjs/operators'
import {of} from 'rxjs'
import {AuthenticationService} from '../../core/service/auth.service'
import {login, loginFailure, loginSuccess, logout, logoutSuccess,} from './authentication.actions'
import {ActivatedRoute, Router} from '@angular/router'

@Injectable()
export class AuthenticationEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            exhaustMap(({email, password}) => {
                return this.AuthenticationService.login(email, password).pipe(
                    map((user) => {
                        if (user) {
                            const returnUrl =
                                this.route.snapshot.queryParams['returnUrl'] || '/'
                            this.router.navigateByUrl(returnUrl)
                        }
                        return loginSuccess({user})
                    }),
                    catchError((error) => of(loginFailure({error})))
                )
            })
        )
    )

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            exhaustMap(() => {
                this.AuthenticationService.logout()
                this.router.navigate(['/pages-logout'])
                return of(logoutSuccess())
            })
        )
    )

    constructor(
        private actions$: Actions,
        private AuthenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }
}
