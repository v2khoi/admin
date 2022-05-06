import { map, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../entities/user.entity';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUserData') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  login(loginName: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { loginName: loginName, password }, httpOptions)
    .pipe(
      map(result => {      
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if(result.code == 200){
          localStorage.setItem('currentUserData', JSON.stringify(result.data));
          this.currentUserSubject.next(result);
        }
        return result;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserData');
    this.currentUserSubject.next({});
  }
}
