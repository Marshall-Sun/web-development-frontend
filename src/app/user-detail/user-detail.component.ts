/**
 * TODO: Session对象
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  curUser: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  logout() {
    console.log(this.curUser);
  }

  ngOnInit(): void {
    this.userService.initUser(this.route.snapshot.queryParamMap.get('id'));
    this.curUser = this.userService.getCurUser();
  }
}
