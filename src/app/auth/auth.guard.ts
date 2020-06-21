import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    switch (url) {
      case '/login':
        return this.checkLogin();
      case '/register':
        return this.checkLogin();
      case '/user':
        return this.checkUser();
      default:
        break;
    }
  }

  checkLogin(): boolean {
    if (typeof window.localStorage['id'] == 'undefined') {
      return true;
    }
    this.router.navigate(['/user/userList']);
    return false;
  }

  checkUser(): boolean {
    if (typeof window.localStorage['id'] == 'string') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
