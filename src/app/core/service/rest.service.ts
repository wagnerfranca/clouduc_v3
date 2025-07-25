import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalComponent} from '../../GlobalComponents';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
};


@Injectable({providedIn: 'root'})
export class RestService {
    constructor(private http: HttpClient) {
    }

    postAuthLogin(data: any): Observable<any> {
        return this.http.post(
            GlobalComponent.auth_login,
            data,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                }),
            }
        );
    }

    getAllUsers(): Observable<any> {
        return this.http.get(GlobalComponent.getAllUsers, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            }),
        });
    }

}
