import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tasa } from "../models/Tasa";
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class TasasService {
    url: string = "https://api-alumnos.azurewebsites.net/api/v1/alumnos";
    url_base: string = "https://s3service.azurewebsites.net/api/assets/upload";
    url_tasa : string = "https://classroommanagement.tk/tasas";
  
  
    constructor(private http: HttpClient) { }
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    //Registro Tasa
    saveTasa(data: Tasa) {
      return this.http.post<Tasa>(this.url_tasa, JSON.stringify(data),
        this.httpOptions);
    }
    // GET ALL CUPS
    GetTasas() {
      return this.http
        .get(this.url_tasa);
    }
    
    getTasas(): Observable<Tasa[]> {
      return this.http
        .get(this.url_tasa)
        .pipe<Tasa[]>(map((data: any) => data));
    }
  
    // PUT TASA
    UpdateTasa(data: Tasa): Observable<any> {
      return this.http
        .put<Tasa>(
          this.url + '/',
          JSON.stringify(data),
          this.httpOptions);
    }

    // DELETE TASA
    DeleteTasa(id: number) {
      return this.http
        .delete(this.url + '/' + id).subscribe((data: any) => {
          console.log("daata");
          console.log("daata" + data);
        });
    }

  


}



