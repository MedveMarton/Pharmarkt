import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');

  constructor(
    protected auth: AuthService,
    private router: Router 
  ) { }

  async login(){
    if (this.email.value && this.password.value) {
      await this.auth.logIn(this.email.value, this.password.value).catch(err => {
        console.error(err);
    });

    }
  }

  loading: boolean = false;


}
