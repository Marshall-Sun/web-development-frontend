import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  curUser: User;
  registerData;

  initUser(id) {
    Promise.resolve().then(() => {
      this.http.get(`http://localhost:4200/user-info?id=${id}`).toPromise()
        .then(
          data => {
            for (const key in data) {
              this.curUser[key] = data[key];
            }
            console.log(this.curUser);
          },
          error => { console.log("Error", error); }
        );
    });
  }

  handleRegister(formValue) {
    Promise.resolve().then(() => {
      this.http.post<any>('http://localhost:4200/register-info', formValue).toPromise()
        .then(
          data => {
            this.registerData = data;
          },
          error => { console.log("Error", error); }
        );
    });
  }

  getCurUser(): User {
    return this.curUser;
  }

  constructor(private http: HttpClient) {
    this.curUser = new User();
  }
}
