import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registerData;

  getHttpUser(id) {
    return this.http.get(`http://localhost:4200/user-info?id=${id}`).toPromise();
  }

  postRegister(formValue) {
    return this.http.post('http://localhost:4200/register-info', formValue).toPromise();
  }

  postLogin(formValue) {
    return this.http.post('http://localhost:4200/login-info', formValue).toPromise();
  }
  

  constructor(private http: HttpClient) { }
}
