import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:4200';

  getUsers() {
    return this.http.get(`${this.url}/users/info`).toPromise();
  }

  updateUser(newUser) {
    return this.http.post(`${this.url}/users/update`, newUser).toPromise();
  }

  deleteUser(id) {
    return this.http.post(`${this.url}/users/delete`, id).toPromise();
  }
  
  postRegister(formValue) {
    return this.http.post(`${this.url}/register/info`, formValue).toPromise();
  }

  postLogin(formValue) {
    return this.http.post(`${this.url}/login/info`, formValue).toPromise();
  }

  constructor(private http: HttpClient) { }
}
