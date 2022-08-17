import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Alumno } from  '../models/Alumno';
import { Image } from '../models/Image';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceAlumnoService {
  url: string = "https://classroommanagement.tk/api/v1/alumnos";
  url_base: string = "https://s3service.azurewebsites.net/api/assets/upload";


  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  saveAlumno(data: Alumno) {
    return this.http.post<Alumno>(this.url, JSON.stringify(data),
      this.httpOptions);
  }
  CreateAlumno(data: Alumno, image_url: string): Observable<Alumno> {
    data.image = image_url;
    return this.http
      .post<Alumno>(
        this.url + '/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetAlumno(id: number): Observable<Alumno> {
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
  UpdateAlumno(data: Alumno): Observable<any> {
    return this.http
      .put<Alumno>(
        this.url + '/',
        JSON.stringify(data),
        this.httpOptions);
  }
  // DELETE
  DeleteAlumno(id: number) {
    return this.http
      .delete(this.url + '/' + id).subscribe((data: any) => {
        console.log("daata");
        console.log("daata" + data);
      });
  }
  // save image
  SaveImage(file: File): Observable<Image> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file);

    // Make http post request over api
    // with formData as req
    return this.http.post<Image>(this.url_base, formData);
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
  sendClickEvent(alumno: Alumno) {
    this.subject.next(alumno);
  }
  getClickEvent(): Observable<Alumno> {
    return this.subject.asObservable();
  }

}
