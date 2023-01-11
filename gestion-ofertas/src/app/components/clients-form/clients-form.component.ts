import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../interfaces/client.interface';
import { User } from '../../interfaces/user.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss'],
})
export class ClientsFormComponent implements OnInit {
  arrErrors: any[] = [];

  title: string = '';

  profile: User | any;
  role: string = '';
  path: string = '';

  register: FormGroup;

  name_clientError: any;
  mail_clientError: any;
  directionError: any;
  phoneError: any;
  statusError: any;

  constructor(
    private clientsService: ClientsService,
    private profileService: ProfileService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.register = new FormGroup({
      name_client: new FormControl('', []),
      mail_client: new FormControl('', []),
      direction: new FormControl('', []),
      phone: new FormControl('', []),
      status: new FormControl('', []),
    });

    this.title = 'Registrar Clientes';
  }

  async ngOnInit(): Promise<void> {
    this.aRoute.params.subscribe(async (params: any) => {
      if (params.idClient) {
        this.title = 'Actualizar Clientes';
        let id = parseInt(params.idClient);
        let updateClient = await this.clientsService.getByIdClients(id);
        this.register = new FormGroup({
          id_client: new FormControl(updateClient.id_client, []),
          name_client: new FormControl(updateClient.name_client, []),
          mail_client: new FormControl(updateClient.mail_client, []),
          direction: new FormControl(updateClient.direction, []),
          phone: new FormControl(updateClient.phone, []),
          status: new FormControl(updateClient.status, []),
        });
      }
    });

    this.profile = await this.profileService.getProfile();
    this.role = this.profile.userRole;

    if (this.role === 'user') {
      this.path = '/seller/clients';
    } else if (this.role === 'admin') {
      this.path = '/director/clients';
    } else if (this.role === 'master') {
      this.path = '/management/clients';
    }
  }

  async getDataForm() {
    if (this.register.value.id_client) {
      try {
        let response: any = await this.clientsService.editClient(
          this.register.value
        );

        if (response.affectedRows === 1) {
          this.router.navigate([this.path]);
        } else {
          alert('No se actualizó');
        }
      } catch (reject: any) {
        this.arrErrors = reject.error;

        this.name_clientError = this.arrErrors.find(
          (error) => error.param === 'name_client'
        );

        this.mail_clientError = this.arrErrors.find(
          (error) => error.param === 'mail_client'
        );

        this.directionError = this.arrErrors.find(
          (error) => error.param === 'direction'
        );

        this.phoneError = this.arrErrors.find(
          (error) => error.param === 'phone'
        );

        this.statusError = this.arrErrors.find(
          (error) => error.param === 'status'
        );
      }
    } else {
      try {
        let response = await this.clientsService.register(this.register.value);

        if (response.insertId) {
          this.router.navigate([this.path]);
        }
      } catch (reject: any) {
        this.arrErrors = reject.error;

        this.name_clientError = this.arrErrors.find(
          (error) => error.param === 'name_client'
        );

        this.mail_clientError = this.arrErrors.find(
          (error) => error.param === 'mail_client'
        );

        this.directionError = this.arrErrors.find(
          (error) => error.param === 'direction'
        );

        this.phoneError = this.arrErrors.find(
          (error) => error.param === 'phone'
        );

        this.statusError = this.arrErrors.find(
          (error) => error.param === 'status'
        );
      }
    }
  }
}
