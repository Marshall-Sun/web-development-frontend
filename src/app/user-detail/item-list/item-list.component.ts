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
  name: string;
  storage: number;
  price: number;
  shopname: string;
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
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  editCache: { [key: number]: { edit: boolean; data: DataItem } } = {};
  listOfData: any = [];
  editResult: any = {};

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.userService.getItems().then((data) => {
      this.listOfData = data;
      this.updateEditCache();
    });
  }

  listOfColumns: ColumnItem[] = [
    {
      name: '商品编号',
      sortFn: (a: DataItem, b: DataItem) => a.id - b.id,
    },
    {
      name: '名称',
    },
    {
      name: '库存',
      sortFn: (a: DataItem, b: DataItem) => a.id - b.id,
    },
    {
      name: '价格',
      sortFn: (a: DataItem, b: DataItem) => a.id - b.id,
    },
    {
      name: '所在店铺',
      filterMultiple: true,
      listOfFilter: [
        { text: '商店1', value: '商店1' },
        { text: '商店2', value: '商店2' },
      ],
      filterFn: (list: string[], item: DataItem) =>
        list.some((shopname) => item.shopname.indexOf(shopname) !== -1),
    },
    {
      name: '操作',
    },
  ];

  startEdit(id: number): void {
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

    this.userService.updateItem(this.listOfData[index]).then((data) => {
      this.editResult = data;
      if (this.editResult.success) {
          this.message.create('success', '修改成功');
      } else {
        this.message.create('error', '修改失败');
      }
    });
  }

  deleteItem(id: number): void {
    const index = this.listOfData.findIndex((item) => item.id === id);

    if (window.localStorage['shopname'] != this.listOfData[index].shopname) {
      this.message.create('error', '无对应商店管理权限');
      return;
    }

    this.userService.deleteItem({ id }).then((data) => {
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
