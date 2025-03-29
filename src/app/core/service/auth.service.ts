import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

import {User} from '../model/auth.models'
import {CookieService} from 'ngx-cookie-service'
import {GlobalComponent} from '../../GlobalComponents';
import {Router} from '@angular/router';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    user: User | null = null

    public readonly authSessionKey = 'access_token'

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
    ) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        return sessionStorage.getItem("userinfo");
    }

    /**
     * login the user and check if the user is authenticated
     */
    login(email: string, password: string) {
        return this.http.post<User>(GlobalComponent.auth_login, {email, password}).pipe(
            map(user => {
                if (user && user.token) {
                    this.user = user
                    console.log(user);
                    this.cookieService.set(this.authSessionKey, user.token, 1, '/')
                    sessionStorage.setItem(this.authSessionKey, user.token)
                    sessionStorage.setItem('userinfo', JSON.stringify(user));
                }
                return user

            })
        )
    }


    /**
     * Logout the user
     */
    logout(): void {
        // remove user from cookie to log user out
        this.cookieService.delete(this.authSessionKey)
        this.user = null
    }

}
