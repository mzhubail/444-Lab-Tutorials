import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm;

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [
        Validators.required, Validators.email, Validators.maxLength(64),
        Validators.minLength(8),
      ]],
      password: ['', [Validators.required, Validators.minLength(8),]],
      passwordConfirm: ['', [Validators.required,]],
    })
  }

  ngOnInit() {
  }

  login() {
    throw new Error('Method not implemented.');
  }
}
