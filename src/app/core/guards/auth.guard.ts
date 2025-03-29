import {inject} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot,} from '@angular/router'
import {AuthenticationService} from '../service/auth.service'

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let authenticationService = inject(AuthenticationService)
    let router = inject(Router)
    let currentUser = JSON.parse(<string>sessionStorage.getItem("userinfo"));


    if (currentUser) {
        let expire_time = new Date(currentUser['expire_time']).toLocaleString("pt-BR");
        let current_time = new Date().toLocaleString('pt-BR');

        /**
         * check datetime token is expired
         */
        if (expire_time < current_time) {
            return router.navigate(['/auth/login']);
        }

        return true
    }
    return router.navigate(['/auth/login'])
}

