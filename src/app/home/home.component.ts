import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../models/Alumno';
import { ServiceAlumnoService } from '../services/service-alumno.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alumnos:Alumno[]=[];
  
  constructor(private serviceAlumno: ServiceAlumnoService) {
    this.serviceAlumno.getUsers().subscribe((res) => {
    this.alumnos=res;
    console.log("---------------"+JSON.stringify(res))
    });
   }

  ngOnInit(): void {
  }

}
