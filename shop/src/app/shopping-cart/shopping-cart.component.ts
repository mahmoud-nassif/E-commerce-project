import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart;
cartItemsCounter
ids;
totalPrice;
  constructor(private cartsrv:ShoppingCartService,
    private auth:AuthService,
    private router:Router) { }

  ngOnInit() {
  this.cartsrv.getOrCreateCart().subscribe(
      cart=>
      {
        this.cart=cart
          this.cartItemsCounter=0
          for(let key in cart.items){
            this.cartItemsCounter+=cart.items[key].quantity
          }
          this.ids=cart.items? Object.keys(cart.items):[]
          this.totalPrice=0
          for(let key in cart.items){
            this.totalPrice+=(cart.items[key].product.price*cart.items[key].quantity)
          }
      }
    )
  //this.cart=this.cartsrv.cart
    //this.cartsrv.clearCart()
  }
  clearCart()
  {
    this.cartsrv.clearCart().subscribe(
      cart=>{
        this.cart=cart//this.cartsrv.cart
        this.ids=[]
        this.totalPrice=0
        this.cartsrv.cart.items={};
        this.cartsrv.cartItemsCounter=0;
      } 
    )
    
  }
  // getCart()
  // {
  //   if(!this.cartsrv.cart)return this.cart
  //   return this.cartsrv.cart
  // }
checkOut()
{
 if(this.auth.isLoggedIn())
 {
  this.router.navigate(['check-out'])
 } 
 else{
  this.router.navigate(['login'],{queryParams:{returnUrl:'check-out'}})
 }
}
}
