import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';

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
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("nickname");
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.curUser = new User();
    this.curUser.id = window.localStorage["id"];
    this.curUser.email = window.localStorage["email"];
    this.curUser.nickname = window.localStorage["nickname"];
  }
}
