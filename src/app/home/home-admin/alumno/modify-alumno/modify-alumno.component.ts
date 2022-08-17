import { Component, OnInit } from '@angular/core';
import { ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceAlumnoService } from 'src/app/services/service-alumno.service';

@Component({
  selector: 'app-modify-alumno',
  templateUrl: './modify-alumno.component.html',
  styleUrls: ['./modify-alumno.component.css']
})

export class ModifyAlumnoComponent implements OnInit {
  public formDisabled = true;
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  alumnos = new FormGroup({
    id: new FormControl({ value: '', disabled: this.formDisabled }),
    name: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });
  constructor(private serviceAlumno: ServiceAlumnoService,
    dialog: MatDialog,
    public dialogo: MatDialogRef<ModifyAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }
  updateAlumno() {
    this.alumnos.value.id = this.data.id;
    this.dialogo.close();
    this.serviceAlumno.UpdateAlumno(this.alumnos.value).subscribe((res: any) => {
      console.log("res");

    });
    this.serviceAlumno.sendClickEvent(this.alumnos.value);
  }
  onChange(event: Event) {

    this.file = (event.target as HTMLInputElement).files[0];

  }
  onUpload() {
    if (this.file != null) {
      this.serviceAlumno.SaveImage(this.file).subscribe(
        (res) => {
          console.log("send--------" + JSON.stringify(res));
          this.save(res.url);

        }
      );
    }
    else{
      this.updateAlumno();
    }
  }
  save(image_url: string) {
    this.dialogo.close();

    this.serviceAlumno.CreateAlumno(this.alumnos.value, image_url).subscribe((res) => {
      console.log('Issue added!' + JSON.stringify(this.alumnos.value.firstName));

    });
    this.serviceAlumno.sendClickEvent(this.alumnos.value);


  }

}
