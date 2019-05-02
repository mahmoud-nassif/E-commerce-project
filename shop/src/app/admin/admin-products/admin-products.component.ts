import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import {product} from '../../interfaces/product';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products=[];
  filteredProducts:product[]
  constructor(private prosrv:ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts()
  {
    this.prosrv.getProducts().subscribe(
      products=>
      {
        this.filteredProducts=this.products=products
        //console.log("done")
      }
    )
  }
  filter(value)
  {
    //console.log(value)
    this.filteredProducts=(value)?
      this.products.filter((product)=>{return product.title.includes(value)})
     :this.products
  }

}
