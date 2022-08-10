import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceAlumnoService } from 'src/app/services/service-alumno.service';
import { ModifyComponent } from '../modify/modify.component';

@Component({
  selector: 'app-detail-alumno',
  templateUrl: './detail-alumno.component.html',
  styleUrls: ['./detail-alumno.component.css']
})
export class DetailAlumnoComponent implements OnInit {

  public formDisabled = true;
 
  alumnos = new FormGroup({
    id:new FormControl({value:'', disabled: this.formDisabled}),
    name: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });
  constructor(private serviceAlumno: ServiceAlumnoService,
    dialog: MatDialog,
    public dialogo: MatDialogRef<ModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
  }
  cerrar(){
    this.dialogo.close();
  }

}
