import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-headerpatodos',
  templateUrl: './headerpatodos.component.html',
  styleUrls: ['./headerpatodos.component.css']
})
export class HeaderpatodosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  poolData = {
    UserPoolId: environment.UserPoolId, // Your user pool id here
    ClientId: environment.ClientId, // Your client id here
  };
  
  onLogout(): void {
    var userPool = new CognitoUserPool(this.poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser.signOut();
    this.router.navigate(['']);
  }

}
