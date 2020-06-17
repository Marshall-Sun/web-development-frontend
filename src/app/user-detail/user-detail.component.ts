import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  welcomeQuote: string;
  curUser;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  logout() {
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('nickname');
    this.router.navigate(['/login']);
  }

  initTime() {
    let now = new Date().getHours();
    if (3 < now && now < 6) {
      this.welcomeQuote = '凌晨了';
    } else if (now < 12) {
      this.welcomeQuote = '早上了';
    } else if (now < 15) {
      this.welcomeQuote = '中午了';
    } else if (now < 19) {
      this.welcomeQuote = '下午了';
    } else if (now < 23) {
      this.welcomeQuote = '晚上了';
    } else {
      this.welcomeQuote = '深夜了';
    }
  }

  ngOnInit(): void {
    this.curUser = new User();
    this.curUser.id = window.localStorage['id'];
    this.curUser.email = window.localStorage['email'];
    this.curUser.nickname = window.localStorage['nickname'];
    this.initTime();
  }
}
