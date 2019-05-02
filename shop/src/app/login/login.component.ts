import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin;
  constructor(private auth:AuthService,private aroute:ActivatedRoute,private router:Router) { }

  ngOnInit() {
  }
  signIn(credentials)
  {
    this.auth.signIn(credentials).subscribe(
      //in success recieve token and save it in local storage
      res=>
      {
        if(res.token)
        {
          localStorage.setItem("token",res.token)
          this.invalidLogin=false
          let returnUrl=this.aroute.snapshot.queryParamMap.get('returnUrl')
          this.router.navigate([returnUrl||'my/orders'])
        }
        else
        this.invalidLogin=true
      }
      //in failure set invalidLogin to true
      // err=>
      // {
      //   console.log("err",err)
      //   this.invalidLogin=true
      // }
    )
  }
}
