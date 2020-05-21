/**
 * TODO: Session对象
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  username: string = '小明';

  constructor() { }

  ngOnInit(): void {
  }

}
