import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: Storage
  ) { }

  getToken(): string {
    return this.storage.getItem('token');
  }

  deleteToken() {
    this.storage.clear();
  }

  setAuth(user) {
    this.storage.setItem('token', user.token);
  }
}
