import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://gestion-ofertas.onrender.com/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Promise<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(this.http.get<Product[]>(this.baseUrl, httpOptions));
  }

  getProductById(pId: number): Promise<Product> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    return lastValueFrom(
      this.http.get<Product>(`${this.baseUrl}/${pId}`, httpOptions)
    );
  }

  getProductsActive(): Promise<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(
      this.http.get<Product[]>(`${this.baseUrl}/active/1`, httpOptions)
    );
  }

  getProductsInactive(): Promise<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    return lastValueFrom(
      this.http.get<Product[]>(`${this.baseUrl}/active/0`, httpOptions)
    );
  }

  editProduct(pFormValue: FormData, productId: number): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return lastValueFrom(
      this.http.put<any>(`${this.baseUrl}/edit/${productId}`, pFormValue)
    );
  }

  register(pFormValue: FormData): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.post<any>(`${this.baseUrl}/register`, pFormValue)
    );
  }

  getBestProducts(): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}/sales/best`));
  }
}
