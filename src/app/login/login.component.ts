import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  data: any = {
    email: '1111@gmail.com',
    password: '123',
    isRememberMe: true,
    tab1: {
      address: '',
      zip: '',
    },
  };

  origin_body_className = document.body.className;
  form!: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
  }
  ngOnDestroy(): void {
    document.body.className = this.origin_body_className;
  }

  doLogin(form: NgForm) {
    if (form.valid) {
      localStorage.setItem('apikey', 'TEST');
      let url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(url);
    }
  }

  /** 使用 function 方式控制表單驗證器 */
  isInvalid(control: NgModel, form: NgForm) {
    return control.invalid && (control.touched || form.submitted);
  }

  isValid(control: NgModel) {
    return control.valid && control.touched;
  }

  /** 示範如何動態 透過雙擊 input 停用欄位 */
  disableField(control: NgModel) {
    if (control.disabled) {
      control.control.enable();
    } else {
      control.control.disable();
    }
  }
}
