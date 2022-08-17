import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  springURL = environment.springURL;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getHelloAdmin():Observable<any> {
    return this.httpClient.get<any>(this.springURL + 'hello-admin');
  }

  public getHelloUser():Observable<any> {
    return this.httpClient.get<any>(this.springURL + 'hello-user');
  }
}
