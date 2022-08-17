import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Tasa } from 'src/app/models/Tasa';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AuthService } from 'src/app/services/auth.service';
import { StringFunctions } from 'src/helpers/StringFunctions';
import { TasasService } from 'src/app/services/tasas-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  
  tasas:Tasa[]=[];
  productoModal : any = [];

  constructor(
    private router: Router,
    private apiRestService: ApiRestService,
    private authService : AuthService,
    private serviceTasa: TasasService
  ) { 
      this.serviceTasa.getTasas().subscribe((res) => {
      this.tasas=res;
      console.log("---------------"+JSON.stringify(res))
      });
  }

  poolData = {
    UserPoolId: environment.UserPoolId, // Your user pool id here
    ClientId: environment.ClientId, // Your client id here
  };

  ngOnInit(): void {
  }

  onLogout(): void {
    var userPool = new CognitoUserPool(this.poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser.signOut();
    this.router.navigate(['']);
  }

  MostrarModal(id : number):void{
    
    let producto = StringFunctions.BuscarProducto(id,this.tasas);
    this.productoModal = {...producto};
  
  }

}
