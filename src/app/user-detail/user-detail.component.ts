/**
 * TODO: Session对象
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  curUser;

  constructor(
    private route: ActivatedRoute,  
    private userService: UserService,
    private router: Router
    ) { }

  logout() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.curUser = new User();
    let id = this.route.snapshot.queryParamMap.get('id');
    this.userService.getHttpUser(id).then(data => this.curUser = data);
  }
}
