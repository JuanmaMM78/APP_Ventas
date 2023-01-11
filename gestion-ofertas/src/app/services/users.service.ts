import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://gestion-ofertas.onrender.com/api/users/';

  constructor(private http: HttpClient) {}

  getAllUsers(): Promise<User[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(this.http.get<User[]>(this.baseUrl, httpOptions));
  }

  getUserById(pId: number): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(
      this.http.get<User>(`${this.baseUrl}${pId}`, httpOptions)
    );
  }

  getUserByStatus(pStatus: number): Promise<User[]> {
    return lastValueFrom(
      this.http.get<User[]>(`${this.baseUrl}status/${pStatus}`)
    );
  }

  login(pFormValue: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.post<any>(`${this.baseUrl}login`, pFormValue, httpOptions)
    );
  }

  register(pFormValue: User): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.post<any>(`${this.baseUrl}register`, pFormValue, httpOptions)
    );
  }

  getProfile(): Promise<any> {
    return lastValueFrom(
      this.http.get<any>(`${this.baseUrl}profile`, this.getHeaders(true))
    );
  }

  editPassword(pId: number, pPass: any, pToken: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: pToken,
      }),
    };

    return lastValueFrom(
      this.http.put<any>(
        `${this.baseUrl}new-password/${pId}`,
        pPass,
        httpOptions
      )
    );
  }

  editUser(pFormValue: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.put<any>(
        `${this.baseUrl}edit/${pFormValue.id_user}`,
        pFormValue,
        httpOptions
      )
    );
  }

  private getHeaders(token: boolean): any {
    let httpOptions: any = {};
    let myToken = localStorage.getItem('token');

    if (token && myToken) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
    }

    return httpOptions;
  }

  setEmail(pMail: string): Promise<any> {
    let datos = 'Prueba';
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    return lastValueFrom(
      this.http.post<any>(
        `${this.baseUrl}send-email/recovery/${pMail}`,
        datos,
        httpOptions
      )
    );
  }
}
