import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Alumno } from '../models/Alumno';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceAlumnoService {
  url: string="https://apialumnos.herokuapp.com/api/v1/alumnos";

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  saveAlumno( data: Alumno){
    return this.http.post<Alumno>(this.url,  JSON.stringify(data),
    this.httpOptions);
  }
  CreateAlumno(data: Alumno): Observable<Alumno> {
    return this.http
      .post<Alumno>(
        this.url + '/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetAlumno(id:number): Observable<Alumno> {
    return this.http
      .get<Alumno>(this.url + '/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET ALL
  GetAlumnos() {
    return this.http
      .get(this.url);
  }
  
  getUsers(): Observable<Alumno[]> {
    return this.http
      .get(this.url)
      .pipe<Alumno[]>(map((data: any) => data));
  }

  // PUT
  UpdateAlumno(data:Alumno): Observable<any> {
    return this.http
      .put<Alumno>(
        this.url + '/',
        JSON.stringify(data),
        this.httpOptions);
  }
  // DELETE
  DeleteAlumno(id:number) {

    return this.http
      .delete( this.url + '/' + id ).subscribe((data:any) => {
        console.log("daata");
        console.log("daata"+data);
      });
  }

  // Error handling
  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
}
private subject = new Subject<Alumno>();
sendClickEvent(alumno: Alumno ) {
  this.subject.next(alumno);
}
getClickEvent(): Observable<Alumno>{ 
  return this.subject.asObservable();
}

}
