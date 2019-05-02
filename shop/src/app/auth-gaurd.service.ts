import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private auth:AuthService,private router:Router) { }
  canActivate(route,state:RouterStateSnapshot)
  {
    if(this.auth.isLoggedIn())return true

    this.router.navigate(['login'],{queryParams:{returnUrl:state.url}});return false

  }
}
