import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [
        Validators.required, Validators.email, Validators.maxLength(64),
        Validators.minLength(8),
      ]],
      password: ['', [Validators.required, Validators.minLength(8),]],
    })
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid)
      return;

    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.authService.logIn(
      email as string,
      password as string,
    );
  }
}
