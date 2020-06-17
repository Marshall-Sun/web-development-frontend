import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isOkLoading = false;
  validateForm: FormGroup;
  dataLogin: any = {}

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isOkLoading = true;
      this.userService.postLogin(this.validateForm.value).then(
        data => {
          this.dataLogin = data;
          if (!this.dataLogin.exist) {
            this.validateForm.controls.email.setErrors({ 'confirm': true });
          } else if (!this.dataLogin.rightPass) {
            this.validateForm.controls.password.setErrors({ 'confirm': true });
          } else {
            window.localStorage["id"] = this.dataLogin.user.id;
            window.localStorage["email"] = this.dataLogin.user.email;
            window.localStorage["nickname"] = this.dataLogin.user.nickname;
            this.router.navigate(['/user']);
          }
        }
      );
    }
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
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
