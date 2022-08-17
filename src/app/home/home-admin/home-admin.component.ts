import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tasa } from 'src/app/models/Tasa';
import { ServiceAlumnoService } from 'src/app/services/service-alumno.service';
import { Alumno } from 'src/app/models/Alumno';
import { AddAlumnoComponent } from './alumno/add-alumno/add-alumno.component';
import { DetailAlumnoComponent } from './alumno/detail-alumno/detail-alumno.component';
import { ModifyAlumnoComponent } from './alumno/modify-alumno/modify-alumno.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  
  public alumnos = new MatTableDataSource<Alumno>();

  name: string = '';
  firstName: string = '';
  displayedColumns: string[] = ['id', 'name', 'firstName', 'lastName', 'email', 'actions'];

  constructor(
    private router: Router,
    private apiRestService: ApiRestService,
    private authService : AuthService,
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
    const dialogRef = this.dialog.open(ModifyAlumnoComponent, {
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

  poolData = {
    UserPoolId: environment.UserPoolId, // Your user pool id here
    ClientId: environment.ClientId, // Your client id here
  };

  ngOnInit(): void {
    this.serviceAlumno.GetAlumnos()
      .subscribe((response: any) => {
        this.alumnos = new MatTableDataSource<Alumno>(response);
      });
  }

  onLogout(): void {
    var userPool = new CognitoUserPool(this.poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser.signOut();
    this.router.navigate(['']);
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


