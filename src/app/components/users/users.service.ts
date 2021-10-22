import { environment } from '../../../environments/environment.prod';
import { User } from '../../entities/user.entity'
import { MessageService } from '../../services/message/message.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pagination } from '../../entities/pagination.entity';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "users";
  constructor(
    private http: HttpClient,
    private MessageService: MessageService
  ) { }

  getUsers(options : HttpParams){
    const url = `${environment.apiUrl}/${this.userUrl}`;
    return this.http.get(url, { params: options }).pipe(
      catchError(this.handleError<User[]>(`getUsers`))
    )
  }

  getUser(id: number): Observable<User> {
    const url = `${environment.apiUrl}/${this.userUrl}/${id}`;
    return this.http.post<User>(url, '', httpOptions).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    )
  }

  editUser(id: string, params: Array<any>) {
    const url = `${environment.apiUrl}/${this.userUrl}`;
    return this.http.patch(url, params, httpOptions).pipe(
      tap(_ => this.log(`fetched page id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  private log(message: string) {
    this.MessageService.add('UserService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
