import { Component, OnInit } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { UserService } from 'src/app/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  editCache: { [key: number]: { edit: boolean; data: DataItem } } = {};
  listOfData: any = [];
  editResult: any = {};

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().then((data) => {
      this.listOfData = data;
      this.updateEditCache();
    });
  }

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
      name: '管理员权限',
      sortFn: (a: DataItem, b: DataItem) =>
        Number(a.ismanager) - Number(b.ismanager),
    },
    {
      name: '操作',
    },
  ];

  startEdit(id: number): void {
    if (window.localStorage['ismanager'] != '1') {
      this.message.create('error', '无管理员权限');
      return;
    }

    const index = this.listOfData.findIndex((item) => item.id === id);

    if (window.localStorage['shopname'] != this.listOfData[index].shopname) {
      this.message.create('error', '无对应商店管理权限');
      return;
    }

    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;

    this.userService.updateUser(this.listOfData[index]).then((data) => {
      this.editResult = data;
      if (this.editResult.success) {
        if (id == window.localStorage['id']) {
          this.message.create('success', '修改自身信息成功，重新登录后生效');
        } else {
          this.message.create('success', '修改成功');
        }
      } else {
        this.message.create('error', '修改失败');
      }
    });
  }

  deleteUser(id: number): void {
    if (window.localStorage['ismanager'] != '1') {
      this.message.create('error', '无管理员权限');
      return;
    }

    if (id == window.localStorage['id']) {
      this.message.create('error', '不能删除自己');
      return;
    }

    const index = this.listOfData.findIndex((item) => item.id === id);

    if (window.localStorage['shopname'] != this.listOfData[index].shopname) {
      this.message.create('error', '无对应商店管理权限');
      return;
    }

    this.userService.deleteUser({ id }).then((data) => {
      this.editResult = data;
      if (this.editResult.success) {
        this.listOfData.splice(index, 1);
        this.ngOnInit();
        this.message.create('success', '删除成功');
      } else {
        this.message.create('error', '删除失败');
      }
    });
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
