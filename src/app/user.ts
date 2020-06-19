export class User {
  id: string;
  email: string
  password: string;
  nickname: string;
  deptname: string;
  shopname: string;
  ismanager: boolean;

  constructor() {
    this.id = null;
    this.email = null;
    this.password = null;
    this.nickname = null;
    this.deptname = null;
    this.shopname = null;
    this.ismanager = false;
  }
}