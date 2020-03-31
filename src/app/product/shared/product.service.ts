import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { products } from 'src/app/products';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get('/api/v1/products')
  }

  getProductById(productId: string): Observable<any>{
    // return products[productId]
    return this.http.get('/api/v1/products/' + productId)
  }
}
