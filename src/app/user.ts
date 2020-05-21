export class User {
  id: string;
  email: string
  password: string;
  nickname: string;
  data: [];

  constructor() {
    this.id = null;
    this.email = null;
    this.password = null;
    this.nickname = null;
    this.data = [];
  }
}