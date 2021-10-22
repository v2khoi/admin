import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = "configs";

  constructor(private http: HttpClient) { } 

  getJson(alias: string): Observable<any> {
    const url = `${environment.apiUrl}/${this.configUrl}/${alias}`;
    return this.http.get(url).pipe()
  }

  putJson(alias: string, data: any){
    const url = `${environment.apiUrl}/${this.configUrl}/${alias}`;
    return this.http.put(url, data).pipe()
  }
}
