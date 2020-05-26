import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})

export class RegisterViewComponent implements OnInit {
  validateForm: FormGroup;
  data = [
    '📧邮箱：',
    '🔑密码：',
    '🔑重复密码：',
    '📛昵称：',
    '📞电话号码：'
  ];

  submitForm() {
    alert('提交成功！');
  }

  update(num: number, value: string) {
    var msg;
    switch (num) {
      case 0:
        msg = "📧邮箱：";
        break;
      case 1:
        msg = "🔑密码：";
        break;
      case 2:
        msg = "🔑重复密码：";
        break;
      case 3:
        msg = "📛昵称：";
        break;
      case 4:
        msg = "📞电话号码：";
        break;
      default:
        break;
    }
    this.data[num] = msg + value;
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      agree: [false]
    });
  }
}
