import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})

export class RegisterViewComponent implements OnInit {
  validateForm: FormGroup;

  hobbies = [
    { value: 'Football', label: '足球' },
    { value: 'Basketball', label: '篮球' },
    { value: 'Volleyball', label: '排球' },
    { value: 'Badminton', label: '羽毛球' },
  ];

  data = [
    '📧邮箱：',
    '🔑密码：',
    '🔑重复密码：',
    '📛昵称：',
    '📞电话号码：',
    '👪性别：',
    '💜爱好：'
  ];

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      alert('提交成功！');
    }
  }

  updateGender(v) {
    this.update(5, v.value);
  }

  updateHobby(v) {
    var str = "";
    for (const hobby of v) {
      if (hobby.checked) {
        str = str + hobby.label + "、";
      }
    }
    console.log('origin', str);

    if (str.lastIndexOf("、") == str.length - 1) {
      str = str.substring(0, str.length - 1);
    }
    this.update(6, str);
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
      case 5:
        msg = "👪性别：";
        break;
      case 6:
        msg = "💜爱好：";
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
      genderGroup: [null, [Validators.required]],
      hobbyGroup: [this.hobbies],
      agree: [null, [Validators.required]]
    });
  }
}
