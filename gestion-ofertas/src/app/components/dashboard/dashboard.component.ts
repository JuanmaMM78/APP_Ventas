import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  myProfile: User | any;
  role: string = '';

  constructor(private router: Router, private usersService: UsersService) {}

  async ngOnInit(): Promise<void> {
    let response = await this.usersService.getProfile();

    if (response.error) {
      alert(response.error);
      this.router.navigate(['/login']);
    }

    this.myProfile = response;
    this.role = this.myProfile.role;
  }

  vistas() {
    if (this.role === 'master') {
      this.router.navigate(['/management']);
    } else if (this.role === 'admin') {
      this.router.navigate(['/director']);
    } else {
      this.router.navigate(['/seller']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
