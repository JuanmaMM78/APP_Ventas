import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  arrUser: User[] = [];
  positionComercial: string = 'Comercial';
  positionDirector: string = 'Director';

  profile: User | any;
  role: string = '';
  path: string = '';

  constructor(
    private usersService: UsersService,
    private profileService: ProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    let response = await this.usersService.getAllUsers();
    this.arrUser = response;

    this.profile = this.profileService.getProfile();
    this.role = this.profile.userRole;

    if (this.role === 'admin') {
      this.path = '/director/generalEmployees/';
    } else if (this.role === 'master') {
      this.path = '/management/generalEmployees/';
    }
  }

  async showStatusUser($event: any): Promise<void> {
    if ($event.target.value === 'todos') {
      let response = await this.usersService.getAllUsers();
      this.arrUser = response;
    } else if ($event.target.value === 'activos') {
      let response = await this.usersService.getUserByStatus(1);
      this.arrUser = response;
    } else if ($event.target.value === 'inactivos') {
      let response = await this.usersService.getUserByStatus(0);
      this.arrUser = response;
    }
  }
}
