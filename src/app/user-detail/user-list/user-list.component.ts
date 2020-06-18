import { Component, OnInit } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { UserService } from 'src/app/user.service';

interface DataItem {
  id: number;
  email: string;
  password: string;
  nickname: string;
  deptname: string;
  shopname: string;
  ismanager: boolean;
}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().then((data) => {
      this.listOfData = data;
    });
  }

  listOfData: any = [];

  listOfColumns: ColumnItem[] = [
    {
      name: '员工编号',
      sortFn: (a: DataItem, b: DataItem) => a.id - b.id,
    },
    {
      name: '邮箱',
      sortFn: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
    },
    {
      name: '密码',
      sortFn: (a: DataItem, b: DataItem) =>
        a.password.localeCompare(b.password),
    },
    {
      name: '昵称',
    },
    {
      name: '部门',
      filterMultiple: true,
      listOfFilter: [
        { text: '管理部', value: '管理部' },
        { text: '销售部', value: '销售部' },
      ],
      filterFn: (list: string[], item: DataItem) =>
        list.some((deptname) => item.deptname.indexOf(deptname) !== -1),
    },
    {
      name: '店铺',
      filterMultiple: true,
      listOfFilter: [
        { text: '商店1', value: '商店1' },
        { text: '商店2', value: '商店2' },
      ],
      filterFn: (list: string[], item: DataItem) =>
        list.some((shopname) => item.shopname.indexOf(shopname) !== -1),
    },
    {
      name: '是否为经理',
      sortFn: (a: DataItem, b: DataItem) =>
        Number(a.ismanager) - Number(b.ismanager),
    },
  ];
}
