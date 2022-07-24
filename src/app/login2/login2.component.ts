import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
})
export class Login2Component implements OnInit, OnDestroy {
  //  data 預設值
  data = {
    email: '123@gmail.com',
    password: '123123',
    isRememberMe: true,
  };

  orig_body_className = document.body.className;
  // form!: UntypedFormGroup;

  /** 定義 form 的驗證條件 */
  form = this.fb.group({
    email: this.fb.control('', {
      // validators 綁驗證條件
      validators: [Validators.required, Validators.email],
      // 變更偵測條件
      updateOn: 'blur',
    }),
    password: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ],
    }),
    isRememberMe: this.fb.control(true, {}),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    // 模擬 server 2 秒後，把 data 丟進 form
    setTimeout(() => {
      this.form.setValue(this.data);
    }, 2000);
  }

  ngOnDestroy(): void {
    document.body.className = this.orig_body_className;
  }
}
