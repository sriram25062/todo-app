import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  domain: string = environment.domain;
  tokenKey: string = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async registerUser(data: any) {
    return await lastValueFrom(this.http.post(this.domain + '/user/create', data));
  }
  
  async loginUser(data: any) {
    return await lastValueFrom(this.http.post(this.domain + '/user/login', data));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  getUserInfo(): any {
    const token = this.getToken();
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }

  validateToken() {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken && decodedToken.exp && decodedToken.exp >= currentTime) {
        return true;
      }
    }
    return false;
  }

  async logOut() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['login']);
  }
}
