import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url="http://localhost:8080/category/"
  constructor(private http:HttpClient) { }
  getCategories()
  {
   return this.http.get<any[]>(this.url+"list")
  }
}
