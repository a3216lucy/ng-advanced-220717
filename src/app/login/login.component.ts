import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  origin_body_className = document.body.className;

  constructor() {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
  }
  ngOnDestroy(): void {
    document.body.className = this.origin_body_className;
  }
}
