import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:4200';
  loginData;

  getHttpUser(id) {
    return this.http.get(`${this.url}/users/info?id=${id}`).toPromise();
  }

  postRegister(formValue) {
    return this.http.post(`${this.url}/register/info`, formValue).toPromise();
  }

  postLogin(formValue) {
    let res = this.http.post(`${this.url}/login/info`, formValue).toPromise();
    res.then(
      data => { this.loginData = data }
    );
    return res;
  }

  constructor(private http: HttpClient) { }
}
