import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class MasterGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token: any = jwt(localStorage.getItem('token')!);
    if (localStorage.getItem('token') && token.userRole === 'master') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
