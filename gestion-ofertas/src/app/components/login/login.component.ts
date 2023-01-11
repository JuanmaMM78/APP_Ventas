import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: string = '';
  email: string = '';

  arrUsers: User[] = [];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {}

  async getDataForm(pForm: any): Promise<void> {
    try {
      let response = await this.usersService.login(pForm.value);
      if (response.success) {
        localStorage.setItem('token', response.token);
        window.location.href = '/dashboard';
      }
    } catch (reject: any) {
      this.error = reject.error.error;
    }

    pForm.resetForm();
  }

  async modal(): Promise<any> {
    await this.usersService.setEmail(this.email);
    alert(`Se envió un mensaje al correo ${this.email}`);
  }

  userMail(pMail: any) {
    this.email = pMail.target.value;
  }
}
