import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { JwtHelper } from 'angular2-jwt';
//import {} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:8080/user/"
  constructor(private http:HttpClient,private router:Router) { }


  signIn(credentials)
  {
    return this.http.post<any>(this.url+"signin",credentials)
  }

  logout()
  {
    localStorage.removeItem("token")
    this.router.navigate(['login']);
  }

  isLoggedIn()
  {
    //let jwth=new JwtHelper();
    let token=localStorage.getItem("token");
    if(token)
    {
    // console.log("decoded", jwth.decodeToken(token))
      return true
    }
    else
    {
      return false
    } 
  }

  isAdmin()
  {
   let token=localStorage.getItem("token")
   if(token)
   {
     //decode token and check the is Admin property
     return true
   
   }
   else
   {
     return false
   }
  }

  getUserName()
  {
    let token=localStorage.getItem("token")
    return this.http.post<any>(this.url+"getUserName",{token})
  }
}
