import { Injectable, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  url="http://localhost:8080/cart/"
  cart;
  cartItemsCounter
 
  constructor(private http:HttpClient,private router:Router) {
    //if(this.getOrCreateCart!==undefined)
    
      this.getOrCreateCart().subscribe(
        cart=>
        {
          this.cart=cart
          this.cartItemsCounter=0
          for(let key in cart.items){
          this.cartItemsCounter+=cart.items[key].quantity}
          // for(let key in cart.items){
          //   this.cartItemsCounter+=cart.items[key].quantity
          //  }
        }
      )
    
    
   }

   createCart()
  {
    return this.http.get<any>(this.url+"create")
  }
   getCart(cartId)
  {
    return this.http.get<any>(this.url+"get/"+cartId)
  }
   getOrCreateCart()
  {
    let cartId=localStorage.getItem("cartId");
    if(!cartId)
    {
      this.createCart().subscribe(
          cart=>
          {
            localStorage.setItem("cartId",cart._id)
            console.log("inside create")
            console.log(cart)
           // return cart
           return this.getCart(cart._id)
            //.subscribe(
          //    cart=>{
          //     Cart=cart
          //     console.log(Cart)
          //     return Cart;
          //    }
          //  )
           }
        )  
    }
    else
    {
      return this.getCart(cartId)
      //  .subscribe(
      //   cart=>{
      //     Cart=cart
      //     console.log(Cart)
      //     return Cart;
      //   }
      // )
    }
    
      
      
      //.subscribe(cart=>{
      //   console.log("inside get")
      //  console.log(cart)
      //   return cart
      // }
    //)
  }
  addToCart(product)
  {
    // let Cart=this.getOrCreateCart()
    // Cart.
    // console.log(this.getOrCreateCart())
    //
    let Cart;
    this.getOrCreateCart().subscribe(
       cart=>{
         console.log("cart is")
         console.log(cart)
         Cart=cart; 
         return this.http.post<any>(this.url+"add",{Cart,product}).subscribe(
           cart=>
           {
            this.cart=cart
            this.cartItemsCounter=0
             for(let key in cart.items){
             this.cartItemsCounter+=cart.items[key].quantity
            }
           }
         )//.toPromise()  
      })
   
    //observables doesn't hit the api unless subscribe so i used promise
    //must send the cart not null to api so called it in subscribe
    //now complete your add router to add the product in cart
    //maybe you wanna modify getorcreatecart method to return cart instead of observable
   
    // return Cart;
    // console.log("before api")
    //return this.http.post<any>(this.url+"add",{Cart,product}).toPromise()
  }
  removeFromCart(product)
  {
    let Cart;
    this.getOrCreateCart().subscribe(
       cart=>{
         Cart=cart; 
         return this.http.post<any>(this.url+"remove",{Cart,product}).subscribe(
           cart=>
           {
            this.cart=cart
            this.cartItemsCounter=0
             for(let key in cart.items){
             this.cartItemsCounter+=cart.items[key].quantity
            }
           }
         )//.toPromise()
       }  
     )
  }

  clearCart()
  {
    
    let cartId=localStorage.getItem("cartId")
    // this.getOrCreateCart().subscribe(
    //    cart=>{
    //      Cart=cart; 
    //      return this.http.post(this.url+"clear",Cart).subscribe(
    //        cart=>
    //        {
    //         this.cart=cart
    //        }
    //      )//.toPromise()
    //    }  
    //  )  
    return this.http.post<any>(this.url+"clear",{cartId})
  }

}
