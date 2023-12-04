import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  password = '';
  email = '';

  constructor(
    public authService: AuthService,
  ) { }

  signIn() {
    this.authService.signIn(this.email, this.password);
  }
}
