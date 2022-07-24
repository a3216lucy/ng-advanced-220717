import { AbstractControl } from '@angular/forms';

/** 自定義驗證器 */
export function forbiddenPassword(control: AbstractControl) {
  if (!control.value) {
    return null;
  }

  let words = ['will', 'dustily', '123'];

  // 只要包含特定文字就不能當密碼
  let result = words.some((x) => control.value.indexOf(x) >= 0);

  if (result) {
    return { forbiddenPassword: true };
  } else {
    return null;
  }
}
