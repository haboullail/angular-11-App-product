import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { catchError,map,startWith } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ : Observable<AppDataState<Products[]>> | null = null;
  readonly DataStateEnum =DataStateEnum;

  constructor(private productsService : ProductsService,private router : Router) { }

  ngOnInit(): void {
  }
  onGetAllProducts() {
    this.products$ =
      this.productsService.getAllProducts().
      pipe(
        map(data =>{
          console.log(data);
          return ({dataState : DataStateEnum.LOADED, data:data })
        }),
        startWith({dataState :DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMassage : err.message}))
      );
  }

  // onGetAvailableProducts():void
  // {
  //   this.productsService.getAllProducts().subscribe(data=>{
  //     this.products = data
  //   },error=>{
  //     console.log(error)
  //   });
  // }

  onGetAvailableProducts()
  {
    this.products$ =
      this.productsService.getAvailableProducts().
      pipe(
        map(data =>{
          console.log(data);
          return ({dataState : DataStateEnum.LOADED, data:data })
        }),
        startWith({dataState :DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMassage : err.message}))
      );
  }

  onGetSelectedProducts()
  {
    this.products$ =
      this.productsService.getSelectedProducts().
      pipe(
        map(data =>{
          console.log(data);
          return ({dataState : DataStateEnum.LOADED, data:data })
        }),
        startWith({dataState :DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMassage : err.message}))
      );
  }
  onSearch(valeur : any)
  {
    this.products$ =
    this.productsService.searchProducts(valeur).
    pipe(
      map(data =>{
        console.log(data);
        return ({dataState : DataStateEnum.LOADED, data:data })
      }),
      startWith({dataState :DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMassage : err.message}))
    );
  }
  onSelect(p : Products)
  {
    this.productsService.select(p)
    .subscribe(data=>{
      p.selected = data.selected;
    })
  }
  onDelet(p : Products)
  {
    let v = confirm("Etes vous sure ?");
    if(v == true)
    this.productsService.delete(p).subscribe(data=>{
      this.onGetAllProducts();
    })
  }

  onNewProduct()
  {
    this.router.navigateByUrl("/newProduct");
  }
  onEdit(p : Products){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
