import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseURL}/product`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.baseURL}/product/${id}`);
  }

  createProduct(product: Product): Observable<Product> { 
    return this.http.post<Product>(`${environment.baseURL}/product/create`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.baseURL}/product/delete?productID=${id}`);
  }

  updateProduct(id: string, product: Product): Observable<Product> { 
    return this.http.put<Product>(`${environment.baseURL}/product/update?productID=${id}`, product);
  }
}
