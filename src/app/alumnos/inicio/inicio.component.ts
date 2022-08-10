import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ServiceAlumnoService } from 'src/app/services/service-alumno.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/Alumno';
import { AddAlumnoComponent } from '../add-alumno/add-alumno.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ModifyComponent } from '../modify/modify.component';
import { DetailAlumnoComponent } from '../detail-alumno/detail-alumno.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  public alumnos = new MatTableDataSource<Alumno>();

  name: string = '';
  firstName: string = '';
  displayedColumns: string[] = ['id', 'name', 'firstName', 'lastName', 'email', 'actions'];
  constructor(
    private serviceAlumno: ServiceAlumnoService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.serviceAlumno.getClickEvent().pipe().subscribe(dat => {
      if (dat.id != null) {//update table and services
        const foundIndex = this.alumnos.data.findIndex(x => x.id === dat.id);
        console.log("pos: "+foundIndex);
        this.alumnos.data.splice(foundIndex, 1, dat);//[foundIndex]=dat;
        

      } else {
        dat.id = this.alumnos.data[this.alumnos.data.length - 1].id + 1;

        this.alumnos.data = [...this.alumnos.data, dat];
      }
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddAlumnoComponent, {
      data: { name: this.name, firstName: this.firstName },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("close ");
    }
    );
  }
  openDialogDetail(alumno: Alumno): void {
    const dialogRef = this.dialog.open(DetailAlumnoComponent, {
      data: alumno
    });

  }
  openDialogModify(alumno: Alumno): void {
    const dialogRef = this.dialog.open(ModifyComponent, {
      data: alumno
    });

    dialogRef.afterClosed().subscribe(()=> {
      this.serviceAlumno.GetAlumnos()
        .subscribe((response: any) => {
          
          this.alumnos= new MatTableDataSource<Alumno>(response);
          console.log("updated");
  console.log(this.alumnos.data);
        });
    }
    );
  }
  ngOnInit(): void {
    this.serviceAlumno.GetAlumnos()
      .subscribe((response: any) => {
        this.alumnos = new MatTableDataSource<Alumno>(response);

      });


  }
  confirm(id: number) {
    this.deleteNotification(id)


  }

  deleteNotification(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El registro ha sido eliminado.',
          showConfirmButton: false,
          timer: 1500
        })

        /*Delete student if confirm */
        this.deleteService(id);

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tu archivo imaginario está a salvo :)',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  deleteService(id: number) {
    this.alumnos.data = this.alumnos.data.filter(
      (u: Alumno) => u.id !== id
    );
    this.serviceAlumno.DeleteAlumno(id);
  }




}