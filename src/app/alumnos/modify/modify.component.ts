import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceAlumnoService } from 'src/app/services/service-alumno.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
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
  updateAlumno(){
    this.alumnos.value.id=this.data.id;
    this.dialogo.close();
    this.serviceAlumno.UpdateAlumno(this.alumnos.value).subscribe((res:any) => {
      console.log("res");
      
    });
    this.serviceAlumno.sendClickEvent(this.alumnos.value);
  }

}
