import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login = '';
  password = '';

  constructor(
    private checkForm: CheckFormService,
    private auth: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router,
  ) { }

  onFormSubmit(e: Event) {
    e.preventDefault();

    const user = {
      login: this.login,
      password: this.password,
    }

    const errors: string[] = [];

    if (!this.checkForm.checkLogin(user.login)) {
      this.showMessage('User login is empty');
    }

    if (!this.checkForm.checkPassword(user.password)) {
      this.showMessage('User password is empty');
    }

    if (errors[0]) {
      return;
    }

    this.auth.authUser(user).subscribe((data: any) => {
      if (!data.success) {
        this.showMessage(data.message);

        return;
      }

      this.showMessage('Welcome!', 'alert-success');

      this.router.navigate(['dashboard']);

      this.auth.storeUser(data.token, data.user);
    });
  }

  showMessage(message: string, cssClass = 'alert-danger') {
    this.flashMessages.show(message, {
      cssClass,
      timeout: 4000,
    });
  }

  ngOnInit(): void {
  }

}
