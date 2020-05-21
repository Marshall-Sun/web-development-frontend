/**
 * TODO: Session对象
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  curUser: User;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  inituser(id) {
    let promise = new Promise((resolve, reject) => {
      this.http.get(`http://localhost:4200/user-info?id=${id}`).toPromise()
        .then(
          data => {
            for (const key in data) {
              this.curUser[key] = data[key];
            }
            console.log(this.curUser);
          },
          error => {
            console.log("Error", error);
          }
        );
    });
    return promise;
  }

  ngOnInit(): void {
    this.curUser = new User();
    this.curUser.id = this.route.snapshot.queryParamMap.get('id');
    this.inituser(this.curUser.id)
  }
}
