import { Component, OnInit, Inject, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceAlumnoService } from 'src/app/services/service-alumno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InicioComponent } from '../inicio/inicio.component';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.css']
})
export class AddAlumnoComponent implements OnInit {
  alumnos = new FormGroup({
    name: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });


  constructor(
    private serviceAlumno: ServiceAlumnoService,
    private ngZone: NgZone,
    dialog: MatDialog,
    private router: Router,
    public dialogo: MatDialogRef<AddAlumnoComponent>,
    private changeDetectorRefs: ChangeDetectorRef
   ) { }

  ngOnInit(): void {
  }
  
  save() {
    this.dialogo.close();
    this.serviceAlumno.CreateAlumno(this.alumnos.value).subscribe((res) => {
      console.log('Issue added!'+JSON.stringify(this.alumnos.value.firstName));
      
    });
    this.serviceAlumno.sendClickEvent(this.alumnos.value);
    

  }


  successNotification() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Alumno agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }



}
