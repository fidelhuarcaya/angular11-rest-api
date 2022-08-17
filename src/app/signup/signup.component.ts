import { Iuser } from '../models/Iuser';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  givenName: string;
  nickname: string;
  password: string;


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    // set attributes
    var attrList = [];
    var iuser: Iuser = {
      email: this.email,
      given_name: this.givenName,
      nickname: this.nickname
    }
    for (let key in iuser) {
      var attrData = {
        Name: key,
        Value: iuser[key]
      }
      var attr = new CognitoUserAttribute(attrData);
      attrList.push(attr);
    }
    // sign up
    userPool.signUp(this.email, this.password, attrList, [], (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var newUser = result.user;
      console.log(JSON.stringify(newUser));
      alert('te hemos enviado un correo para activar tu cuenta');
      this.router.navigate(['/login']);
    });
  }

}