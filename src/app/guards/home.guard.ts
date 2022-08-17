import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    var isAuth = this.authService.isAuth();
    if(!isAuth) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}