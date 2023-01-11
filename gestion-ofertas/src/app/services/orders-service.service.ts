import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../interfaces/order.interface';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersServiceService {
  private baseUrl: string = 'https://gestion-ofertas.onrender.com/api/orders/';

  constructor(private http: HttpClient) {}

  getAllOrders(): Promise<Order[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(this.http.get<Order[]>(this.baseUrl, httpOptions));
  }

  getOrderById(pId: number): Promise<Order> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(
      this.http.get<Order>(`${this.baseUrl}${pId}`, httpOptions)
    );
  }

  register(pFormValue: Order, pMail: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return lastValueFrom(
      this.http.post<any>(
        `${this.baseUrl}register/${pMail}`,
        pFormValue,
        httpOptions
      )
    );
  }

  editOrder(pFormValue: Order, pMail: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.put<any>(
        `${this.baseUrl}edit/${pFormValue.id_order}/${pMail}`,
        pFormValue,
        httpOptions
      )
    );
  }

  setMailDirector(pId: number, pStatus: string, pMail: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(
      this.http.post<any>(
        `${this.baseUrl}send-email/reminder/${pId}/${pStatus}/${pMail}`,
        httpOptions
      )
    );
  }

  getOrdersByStatus(pStatus: string): Promise<Order[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.get<Order[]>(
        `${this.baseUrl}/status/${pStatus}/1/1000`,
        httpOptions
      )
    );
  }

  // Aquí falta un end point para traer los productos por cliente
  getOrderByClient(pId: number): Promise<Order[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.get<Order[]>(`${this.baseUrl}client/${pId}`, httpOptions)
    );
  }

  getOrderByProduct(pId: number): Promise<Order[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.get<Order[]>(`${this.baseUrl}product/${pId}`, httpOptions)
    );
  }

  getOrderByDate(pDate: string): Promise<Order[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.get<Order[]>(`${this.baseUrl}date/${pDate}`, httpOptions)
    );
  }

  getUsersForSales(): Promise<User[]> {
    return lastValueFrom(this.http.get<User[]>(`${this.baseUrl}user/best`));
  }
}
