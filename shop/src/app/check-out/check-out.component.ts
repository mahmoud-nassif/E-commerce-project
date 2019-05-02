import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
cart;
totalQuantity
items
totalPrice
//ids
  constructor(private cartsrv:ShoppingCartService,
    private ordsrv:OrderService,
    private router:Router
    ) { }

  ngOnInit() {
    this.cartsrv.getOrCreateCart().subscribe(
      cart=>{
          this.cart=cart
          this.totalQuantity=0
          for(let key in cart.items){
            this.totalQuantity+=cart.items[key].quantity
          }
          this.items=cart.items? Object.values(cart.items):[]//[{product:object,quantity:number}]array of this
          this.totalPrice=0
          for(let key in cart.items){
            this.totalPrice+=(cart.items[key].product.price*cart.items[key].quantity)
          }
      }
    )
  }

  saveOrder(shipping)
  {
    //console.log(shipping)
    let token= localStorage.getItem("token")
    let order={
      dateCreated:new Date().getTime(),
      shipping:shipping,
      items:this.items,
      totalPrice:this.totalPrice,
      totalQuantity:this.totalQuantity,
      userId:token
    }
    this.ordsrv.saveOrder(order).subscribe(
      order=>{
        
        this.router.navigate(['my/orders'],{queryParams:{userId:order.userId}})
        this.cartsrv.clearCart().subscribe(
          cart=>{
            this.cart=cart//this.cartsrv.cart
            //this.ids=[]
            //this.totalPrice=0
            this.cartsrv.cart.items={};
            this.cartsrv.cartItemsCounter=0;
          } 
        )
      }
    )
    //console.log(order)

  }

}
