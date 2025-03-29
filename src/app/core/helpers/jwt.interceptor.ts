import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'

import {AuthenticationService} from '../service/auth.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(
        request: HttpRequest<Request>,
        next: HttpHandler
    ): Observable<HttpEvent<Event>> {

        if(request.url === "/api/v1/auth/login"){
            return next.handle(request)
        }

        let user = JSON.parse(this.authenticationService.currentUser())
        if (user) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
        }

        return next.handle(request)
    }
}
