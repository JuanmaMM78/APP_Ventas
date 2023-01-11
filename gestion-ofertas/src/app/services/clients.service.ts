import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../interfaces/client.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl: string = 'https://gestion-ofertas.onrender.com/api/clients';

  constructor(private http: HttpClient) {}

  getAllClients(): Promise<Client[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(this.http.get<Client[]>(this.baseUrl, httpOptions));
  }

  getByIdClients(pId: number): Promise<Client> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(
      this.http.get<Client>(`${this.baseUrl}/${pId}`, httpOptions)
    );
  }

  register(pFormValue: Client): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.post<any>(`${this.baseUrl}/register`, pFormValue, httpOptions)
    );
  }

  editClient(pFormValue: Client): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return lastValueFrom(
      this.http.put<any>(
        `${this.baseUrl}/edit/${pFormValue.id_client}`,
        pFormValue,
        httpOptions
      )
    );
  }

  getClientsActive(): Promise<Client[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(
      this.http.get<Client[]>(`${this.baseUrl}/status/1`, httpOptions)
    );
  }

  getClientsInactive(): Promise<Client[]> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    return lastValueFrom(
      this.http.get<Client[]>(`${this.baseUrl}/status/0`, httpOptions)
    );
  }

  getBestClients(): Promise<Client[]> {
    return lastValueFrom(
      this.http.get<Client[]>(`${this.baseUrl}/buyers/best`)
    );
  }
}
