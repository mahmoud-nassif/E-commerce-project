import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
orders;
  constructor(private ordsrv:OrderService,private aroute:ActivatedRoute) { }

  ngOnInit() {
   let userId=this.aroute.snapshot.queryParamMap.get('userId')
   this.ordsrv.getOrders(userId).subscribe(
     orders=>this.orders=orders
   )
  }

}
