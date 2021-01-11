import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name = '';
  login = '';
  email = '';
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
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password,
    }

    const errors: string[] = [];

    if (!this.checkForm.checkName(user.name)) {
      this.showMessage('User name is empty');
    }

    if (!this.checkForm.checkLogin(user.login)) {
      this.showMessage('User login is empty');
    }

    if (!this.checkForm.checkEmail(user.email)) {
      this.showMessage('User email is empty');
    }

    if (!this.checkForm.checkPassword(user.password)) {
      this.showMessage('User password is empty');
    }

    if (errors[0]) {
      return;
    }

    this.auth.registerUser(user).subscribe((data: any) => {
      if (!data.success) {
        this.showMessage(data.message);

        return;
      }

      this.showMessage(data.message, 'alert-success');

      this.router.navigate(['reg']);
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
