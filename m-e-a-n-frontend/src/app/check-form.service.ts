import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkName(name: string) {
    return !!name;
  }

  checkLogin(login: string) {
    return !!login;
  }

  checkEmail(email: string) {
    return !!email;
  }

  checkPassword(password: string) {
    return !!password;
  }
}
