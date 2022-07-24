import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forbiddenPassword } from './forbiddenPassword';

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
    profiles: [
      {
        city: 'Taipei',
        tel: '0988-888888',
      },
      {
        city: '台中',
        tel: '0944-444444',
      },
      {
        city: 'Kaohsiung',
        tel: '0911111111',
      },
    ],
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
        forbiddenPassword,
      ],
    }),
    isRememberMe: this.fb.control(true, {}),
    // form array
    profiles: this.fb.array([
      this.makeProfile('Taipei', '0912-345678'),
      this.makeProfile('Taichung', '0955-123456'),
    ]),
  });

  makeProfile(city: string, tel: string) {
    return this.fb.group({
      city: this.fb.control(city, { validators: [Validators.required] }),
      tel: this.fb.control(tel, {
        validators: [Validators.required],
      }),
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    // 模擬 server 2 秒後，把 data 丟進 form
    setTimeout(() => {
      // 如果動態欄位，不知道資料長度，可以先去判斷 profiles 的長度
      this.form.controls.profiles.clear();
      this.data.profiles.forEach((profile) => {
        this.form.controls.profiles.push(
          this.makeProfile(profile.city, profile.tel)
        );
      });

      // this.form.setValue(this.data);
      this.form.patchValue(this.data);
    }, 2000);
  }

  ngOnDestroy(): void {
    document.body.className = this.orig_body_className;
  }

  // reset 表單，會把表單狀態(touch、untouched....)全部重置
  resetForm() {
    this.form.reset(this.data);
  }

  addProfile() {
    this.form.controls.profiles.push(this.makeProfile('', ''));
  }

  doLogin(form: FormGroupDirective) {
    if (form.valid) {
      localStorage.setItem('apikey', 'TEST');
      let url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(url);
    }
  }
}
