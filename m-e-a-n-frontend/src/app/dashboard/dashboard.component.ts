import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private checkForm: CheckFormService,
    private auth: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router,
  ) { }

  onLogout() {
    this.auth.logout();
    this.showMessage('You left the account!', 'alert-warning');
    this.router.navigate(['auth']);
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
