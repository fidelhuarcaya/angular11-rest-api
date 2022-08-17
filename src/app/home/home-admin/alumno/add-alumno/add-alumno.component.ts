import { Component, OnInit, Inject, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceAlumnoService } from 'src/app/services/service-alumno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTable } from '@angular/material/table';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';


@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.css']
})
export class AddAlumnoComponent implements OnInit {

  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
 
  alumnos = new FormGroup({
    name: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });


  constructor(
    private serviceAlumno: ServiceAlumnoService,
    private ngZone: NgZone,
    public dialog: MatDialog,
    private router: Router,
    public dialogo: MatDialogRef<AddAlumnoComponent>,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  save(image_url: string) {
    this.dialogo.close();

    this.serviceAlumno.CreateAlumno(this.alumnos.value, image_url).subscribe((res) => {
      console.log('Issue added!' + JSON.stringify(this.alumnos.value.firstName));

    });
    this.serviceAlumno.sendClickEvent(this.alumnos.value);
  }
  onChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];

  }
  onUpload() {
    this.loading = !this.loading;
    if (this.file != null) {
      this.cerrar();
      this.showDialog();
      this.serviceAlumno.SaveImage(this.file).subscribe(
        (res) => {
          console.log("send--------" + JSON.stringify(res));
          this.save(res.url);
          this.dialog.closeAll();
        }
      );
    }
  }

  showDialog(){
    const dialogSpinner = this.dialog.open(SpinnerComponent, {});
    dialogSpinner.afterClosed().subscribe(() => {
      console.log("close ");
    }
    );
  }
  cerrar(){
    this.dialogo.close();
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
