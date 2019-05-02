import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products=[];
  filteredProductsPerCategory=[];
  categories=[];
  cid;
  cname;
  cart;
  constructor(
    private prosrv:ProductService,
    private catsrv:CategoryService,
    private route:ActivatedRoute,
    private cartsrv:ShoppingCartService,
    private router:Router) { }

  ngOnInit() {
    
    this.getCategories();
    //it gets params before product then filterarray is empty
    this.getProducts();
    //this.cartsrv.getOrCreateCart();

    // this.cartsrv.getOrCreateCart().subscribe(
    //   cart=>
    //   {
    //     this.cart=cart

    //   }
    // )
    
    // this.route.queryParamMap.subscribe(
    //   params=>{
    //     this.cid=params.get("category")
    //     this.cname=params.get('name')
    //     //console.log(params)
    //     console.log("from param filtering start")
    //     this.filteredProductsPerCategory=(this.cid)?
    //     this.products.filter(product=>{return product.category===this.cid})
    //     :this.products
    //     console.log(this.filteredProductsPerCategory)
    //   }
    // )

    // this.route.queryParamMap.subscribe(
    //     params=>{
    //       this.cid=params.get("category")
    //       this.cname=params.get('name')
    //       //console.log(params)
    //       this.filteredProductsPerCategory=(this.cid)?
    //       this.getProducts().filter(product=>{return product.category===this.cid})
    //       :this.getProducts()
    //     }
    //   )

  }

  getProducts()
  {
    this.prosrv.getProducts().subscribe(
      products=>
      {
        console.log("products we got it")
        
        //whether you equal them or not filtered array will still be empty
        //this.filteredProductsPerCategory=
        this.products=products
        this.route.queryParamMap.subscribe(
          params=>{
            this.cid=params.get("category")
            this.cname=params.get('name')
            //console.log(params)
            console.log("from param- filtering start")
            this.filteredProductsPerCategory=(this.cid)?
            this.products.filter(product=>{return product.category===this.cid})
            :this.products
            console.log(this.filteredProductsPerCategory)
          }
        )
        
      }
    )
    //return this.products
  }
  getCategories()
  {
    this.catsrv.getCategories().subscribe(
      categories=>this.categories=categories
    )
  }

  addToCart(product)
  {
    this.cartsrv.addToCart(product)
  }
  removeFromCart(product)
  {
   this.cartsrv.removeFromCart(product)
  }
  getQuantity(product)//get quantity method reads its cart from the cart in cart service
  {
    // this.cartsrv.getOrCreateCart().subscribe(
    //   cart=>{ 
    //     if(!cart)return 0
    //     return cart.items[product._id] ? cart.items[product._id].quantity : 0
    //   }
    // )
    
     if(!this.cartsrv.cart)return 0
    if(!this.cartsrv.cart.items)return 0
    return this.cartsrv.cart.items[product._id] ? this.cartsrv.cart.items[product._id].quantity : 0
  }


}
