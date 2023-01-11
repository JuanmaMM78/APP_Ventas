import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  arrErrors: any[] = [];

  register: FormGroup;

  title: string = '';

  profile: User | any;
  role: string = '';
  path: string = '';

  name_userError: any;
  surname_userError: any;
  mail_userError: any;
  password_userError: any;
  roleError: any;
  statusError: any;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private profileService: ProfileService,
    private aRoute: ActivatedRoute
  ) {
    this.register = new FormGroup(
      {
        name_user: new FormControl('', []),
        surname_user: new FormControl('', []),
        mail_user: new FormControl('', []),
        password_user: new FormControl('', []),
        role: new FormControl('', []),
        status: new FormControl('', []),
      },
      []
    );

    this.title = 'Registra un nuevo Empleado';
  }

  async ngOnInit(): Promise<void> {
    this.aRoute.params.subscribe(async (params: any) => {
      if (params.idUser) {
        this.title = 'Actualiza el Empleado';
        let id = parseInt(params.idUser);
        let updateUser = await this.usersService.getUserById(id);
        this.register = new FormGroup({
          id_user: new FormControl(updateUser.id_user, []),
          name_user: new FormControl(updateUser.name_user, []),
          surname_user: new FormControl(updateUser.surname_user, []),
          mail_user: new FormControl(updateUser.mail_user, []),
          password_user: new FormControl('', []),
          role: new FormControl(updateUser.role, []),
          status: new FormControl(updateUser.status, []),
        });
      }
    });

    this.profile = await this.profileService.getProfile();
    this.role = this.profile.userRole;

    if (this.role === 'admin') {
      this.path = '/director/generalEmployees/usersList';
    } else {
      this.path = '/management/generalEmployees/usersList';
    }
  }

  async getDataForm() {
    if (this.register.value.id_user) {
      try {
        let response: any = await this.usersService.editUser(
          this.register.value
        );

        if (response.affectedRows === 1) {
          this.router.navigate([this.path]);
        } else {
          alert('No se actualizó');
        }
      } catch (reject: any) {
        this.arrErrors = reject.error;

        this.name_userError = this.arrErrors.find(
          (error) => error.param === 'name_user'
        );
        this.surname_userError = this.arrErrors.find(
          (error) => error.param === 'surname_user'
        );
        this.mail_userError = this.arrErrors.find(
          (error) => error.param === 'mail_user'
        );
        this.password_userError = this.arrErrors.find(
          (error) => error.param === 'password_user'
        );
        this.roleError = this.arrErrors.find((error) => error.param === 'role');
        this.statusError = this.arrErrors.find(
          (error) => error.param === 'status'
        );
      }
    } else {
      try {
        let response = await this.usersService.register(this.register.value);

        if (response.insertId) {
          this.router.navigate([this.path]);
        }
      } catch (reject: any) {
        this.arrErrors = reject.error;

        this.name_userError = this.arrErrors.find(
          (error) => error.param === 'name_user'
        );
        this.surname_userError = this.arrErrors.find(
          (error) => error.param === 'surname_user'
        );
        this.mail_userError = this.arrErrors.find(
          (error) => error.param === 'mail_user'
        );
        this.password_userError = this.arrErrors.find(
          (error) => error.param === 'password_user'
        );
        this.roleError = this.arrErrors.find((error) => error.param === 'role');
        this.statusError = this.arrErrors.find(
          (error) => error.param === 'status'
        );
      }
    }
  }
}
