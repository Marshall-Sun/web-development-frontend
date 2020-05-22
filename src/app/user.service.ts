import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registerData;

  async getHttpUser(id) {
    try {
      let $user = await this.http.get(`http://localhost:4200/user-info?id=${id}`).toPromise();
      return $user;
    } catch (e) {
      console.log(e);
    }
  }

  async postRegister(formValue) {
    try {
      let $data = await this.http.post('http://localhost:4200/register-info', formValue);
      return $data;
    } catch (e) {
      console.log(e);
    }
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

  constructor(private http: HttpClient) { }
}
