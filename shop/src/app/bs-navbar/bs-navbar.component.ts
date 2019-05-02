import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
 //cartItemsCounter=0;
 //url="http://localhost:8080/cart/"
  constructor(private cartsrv:ShoppingCartService
    ,private http:HttpClient,
    private auth:AuthService) { }

  ngOnInit() {
    // this.cartsrv.getOrCreateCart().subscribe(
    //   cart=>{
    //     this.cartItemsCounter=0
    //     for(let key in cart.items){
    //       this.cartItemsCounter+=cart.items[key].quantity
    //     }
    //   }
    //  ) 
    //this.getCounter();
    //  return this.http.get<any>(this.url+"get/"+localStorage.getItem("cartId")).subscribe(
    //   cart=>{
    //         this.cartItemsCounter=0
    //         for(let key in cart.items){
    //           this.cartItemsCounter+=cart.items[key].quantity
    //         }}
    //  )
    
  }
  getCounter()
  {
    // if(!this.cartsrv)return this.cartItemsCounter //from bs-navbar 
     return this.cartsrv.cartItemsCounter
  }
  getUserName()
  {
    let email;
    this.auth.getUserName().subscribe(
      user=> {
         email=user.email
      }
    )
    
  }

  logout()
  {
    this.auth.logout()
  }

}
