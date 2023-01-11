import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt from 'jwt-decode';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss'],
})
export class PasswordsComponent implements OnInit {
  url: any;
  token: any;
  finalToken: any;
  profile: any;
  error: string = '';
  register: FormGroup;

  password_userError: any;
  arrErrors: any[] = [];

  constructor(
    private aRouter: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {
    this.register = new FormGroup({
      password_user: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.url = window.location;
    this.token = this.url.search;
    this.finalToken = this.token.slice(1, -1);
    this.profile = jwt(this.finalToken);
  }

  async getDataForm() {
    try {
      let response = await this.usersService.editPassword(
        this.profile.userId,
        this.register.value,
        this.finalToken
      );

      if (response.affectedRows === 1) {
        this.router.navigate(['/login']);
      }
    } catch (reject: any) {
      this.arrErrors = reject.error;

      this.password_userError = this.arrErrors.find(
        (error) => error.param === 'password_user'
      );
    }
  }
}
