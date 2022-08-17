import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  errorStatus:boolean = false;
  errorMsj : any = "";

  onLogin(): void {
    // datos grupo (pool)
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    // datos del user
    var userData = {
      Username: this.email,
      Pool: userPool
    }
    var cognitoUser = new CognitoUser(userData);
    // credenciales
    var authData = {
      Username: this.email,
      Password: this.password
    }
    var authDetails = new AuthenticationDetails(authData);
    // login
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('Token: ' + result.getAccessToken().getJwtToken());
        this.router.navigate(['/home']);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      }
    });
  }

}