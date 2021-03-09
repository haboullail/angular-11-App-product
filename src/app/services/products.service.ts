import { from, Observable } from "rxjs";
import{ Injectable} from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Products } from "../model/products.model";

@Injectable({providedIn:"root"})
export class ProductsService{
    constructor(private http : HttpClient)
    {

    }
    getAllProducts() : Observable<Products[]>
    {
        let host = environment.host;
        return this.http.get<Products[]>(host+"/products");
    }
    getSelectedProducts() : Observable<Products[]>
    {
        let host = environment.host;
        return this.http.get<Products[]>(host+"/products?selected=true");
    }
    searchProducts(keyword : string) : Observable<Products[]>
    {
        let host = environment.host;
        return this.http.get<Products[]>(host+"/products?name_like="+ keyword);
    }
    select(product : Products) : Observable<Products>
    {
        let host = environment.host;
        product.selected != product.selected;
        return this.http.put<Products>(host+"/products/"+product.id,product);
    }
    delete(product : Products) : Observable<void>
    {
        let host = environment.host;
        product.selected != product.selected;
        return this.http.delete<void>(host+"/products/"+product.id);
    }
    getAvailableProducts() : Observable<Products[]>
    {
        let host = environment.host;
        return this.http.get<Products[]>(host+"/products?available=true");
    }
    Save(product : Products) : Observable<Products>{
        let host = environment.host;
        return this.http.post<Products>(host+"/products",product);
    }
    getProducts(id:number) : Observable<Products>
    {
        let host = environment.host;
        return this.http.get<Products>(host+"/products/"+id);
    }
    UpdateProduct(product : Products) : Observable<Products>
    {
        let host = environment.host;
        return this.http.put<Products>(host+"/products/"+product.id,product);
    }
}
