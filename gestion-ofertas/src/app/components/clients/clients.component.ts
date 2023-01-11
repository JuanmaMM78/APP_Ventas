import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';
import { User } from '../../interfaces/user.interface';
import { ProfileService } from '../../services/profile.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  arrClients: Client[] = [];

  profile: User | any;
  role: string = '';
  path: string = '';

  constructor(
    private clientsService: ClientsService,
    private profileService: ProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    let response = await this.clientsService.getAllClients();
    this.arrClients = response;

    this.profile = await this.profileService.getProfile();
    this.role = this.profile.userRole;

    if (this.role === 'user') {
      this.path = '/seller';
    } else if (this.role === 'admin') {
      this.path = '/director';
    } else if (this.role === 'master') {
      this.path = '/management';
    }
  }

  async showClients($event: any): Promise<void> {
    if ($event.target.value === 'Todos') {
      let response = await this.clientsService.getAllClients();
      this.arrClients = response;
    } else if ($event.target.value === 'Activos') {
      let response = await this.clientsService.getClientsActive();
      this.arrClients = response;
    } else if ($event.target.value === 'Inactivos') {
      let response = await this.clientsService.getClientsInactive();
      this.arrClients = response;
    }
  }
}
