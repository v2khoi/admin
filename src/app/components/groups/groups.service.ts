import { environment } from '../../../environments/environment.prod';
import { Group } from '../../entities/group.entity'
import { MessageService } from '../../services/message/message.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupUrl = "groups";
  constructor(
    private http: HttpClient,
    private MessageService: MessageService
  ) { }

  getGroups(options : HttpParams){
    const url = `${environment.apiUrl}/${this.groupUrl}`;
    return this.http.get(url, { params: options }).pipe(
      catchError(this.handleError<Group[]>(`getGroups`))
    )
  }

  getGroup(id: number): Observable<Group> {
    const url = `${environment.apiUrl}/${this.groupUrl}/${id}`;
    return this.http.post<Group>(url, '', httpOptions).pipe(
      tap(_ => this.log(`fetched Group id=${id}`)),
      catchError(this.handleError<Group>(`getGroup id=${id}`))
    )
  }

  editGroup(id: string, params: Array<any>) {
    const url = `${environment.apiUrl}/${this.groupUrl}`;
    return this.http.patch(url, params, httpOptions).pipe(
      tap(_ => this.log(`fetched page id=${id}`)),
      catchError(this.handleError<Group>(`getGroup id=${id}`))
    );
  }

  private log(message: string) {
    this.MessageService.add('GroupService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
