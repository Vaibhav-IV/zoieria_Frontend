import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE = 'auth-role'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }
  //Token 
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  //Role
  public saveRole(roles: string): void {
    window.sessionStorage.removeItem(ROLE);
    window.sessionStorage.setItem(ROLE, JSON.stringify(roles));
  }
  public getRole(): string | null {
    return window.sessionStorage.getItem(ROLE);
  }
  //User
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log(user);
    
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  public isAdmin(): boolean {
    const role = window.sessionStorage.getItem(ROLE)?.includes("ADMIN");
    if (role) {
      return true;
    }
    return false;
  }

  public isUser(): boolean {
    const role = window.sessionStorage.getItem(ROLE)?.includes("USER");
    if (role) {
      return true;
    }
    return false;
  }

}
