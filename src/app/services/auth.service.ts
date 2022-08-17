import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuth(): boolean {
    var isAuth = false;
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var currentUser = userPool.getCurrentUser();
    if (currentUser != null) {
      currentUser.getSession((err:any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuth = session.isValid();
      });
    }
    return isAuth;
  }

  getToken(): string {
    for (let i = 0; i < localStorage.length; i++ ) {
      if(localStorage.key(i).endsWith(environment.ACCESS_TOKEN) && localStorage.key(i).includes(environment.ClientId)) {
        console.log(localStorage.getItem(localStorage.key(i)));
        return localStorage.getItem(localStorage.key(i));
      }
    }
    return null;
  }

  isAdmin(): boolean {
    var token = this.getToken();
    // aksdfjhkasdjhfkasd.lasdfjlasdjflsdkf.lasdfkjlsadkjflsdkfj
    var payload = token.split('.')[1];
    var payloadDecoded = atob(payload);
    var values = JSON.parse(payloadDecoded);
    var roles = values['cognito:groups'];
    var isAdmin = roles.indexOf('ROLE_ADMIN') < 0 ? false: true;
    return isAdmin;
  }

}