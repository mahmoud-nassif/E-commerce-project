import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories=[];
  product={};
  id;
  constructor(private catsrv:CategoryService,
    private prosrv:ProductService,
    private router:Router,
    private route:ActivatedRoute) { }


  ngOnInit() {
    this.getCategories();
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id)
    {
      this.prosrv.getProductById(this.id).subscribe(
        product=>this.product=product
      )
    }
  }
  getCategories()
  {
    this.catsrv.getCategories().subscribe(
      categories=>this.categories=categories
    )
  }

  save(product)
  {
    //console.log(product)
    if(this.id)
    {
      this.prosrv.updateProduct(this.id,product).subscribe(
        n=>{
           //console.log("updated")
           this.catsrv.getCategories().subscribe(
            categories=>{
              this.categories=categories
              this.router.navigateByUrl('/admin/products')
 
            }
          )
           //this.getCategories()
          //   this.router.navigate(['/admin/products']).then(()=>{
          //     console.log("from updated")
          //   })
         }
      )
    }
    else
    {
      this.prosrv.addProduct(product).subscribe(
        product=>{
         // console.log(product)
          this.router.navigate(['/admin/products'])
        } 
        )
    }
      
  }

  delete()
  {
    this.prosrv.deleteProduct(this.id).subscribe(
      n=>{
        this.catsrv.getCategories().subscribe(
          categories=>{
            this.categories=categories
            this.router.navigateByUrl('/admin/products')

          })
      }
    )
  }

}
