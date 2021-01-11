import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';
  user: object | null = null;

  constructor(private http: HttpClient) { }

  registerUser(user: object) {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/account/reg', user, { headers })
      .pipe(map((res: any) => res.json()));
  }

  authUser(user: object) {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/account/auth', user, { headers })
      .pipe(map((res: any) => res.json()));
  }

  storeUser(token: string, user: object) {
    this.token = token;
    this.user = user;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.token = '';
    this.user = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }
}
