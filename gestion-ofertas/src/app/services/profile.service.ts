import { Injectable } from '@angular/core';
import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  token: any = jwt(localStorage.getItem('token')!);

  constructor() {}

  getProfile(): any {
    return this.token;
  }
}
