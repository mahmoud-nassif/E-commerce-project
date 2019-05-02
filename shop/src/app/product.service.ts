import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url="http://localhost:8080/product/"
  constructor(private http:HttpClient) { }

  addProduct(product)
  {
    return this.http.post<any>(this.url+"add",product)
  }

  getProducts()
  {
    return this.http.get<any[]>(this.url+"list")
  }
  getProductById(id)
  {
  return this.http.get<any>(this.url+"details/"+id)
  }
  updateProduct(productId,product)
  {
   return this.http.post<any>(this.url+"update",{productId,product})
  }
  deleteProduct(id)
  {
    return this.http.get<any>(this.url+"delete/"+id)
  }
}
