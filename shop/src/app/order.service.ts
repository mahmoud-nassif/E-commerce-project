import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
url="http://localhost:8080/order/"
  constructor(private http:HttpClient) { }
  saveOrder(order)
  {
   return this.http.post<any>(this.url+"save",order)
  }

  getOrders(userId){
    return this.http.get<any>(this.url+"list/"+userId)
  }
}
