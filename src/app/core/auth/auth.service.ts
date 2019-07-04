import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.clear();
  }

  setAuth(user) {
    localStorage.setItem('token', user.token);
  }
}
