import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
} from '@angular/fire/firestore';

import {
  Auth,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';

import { AlertController } from '@ionic/angular';
import { Member, MembersService } from './members.service';
import { lastValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // User related variables
  user!: User | null;
  member!: Member | null;


  constructor(
    private auth: Auth,
    private alertCtrl: AlertController,
    private membersService: MembersService,
  ) {
    auth.onAuthStateChanged(user => {
      // Set user
      this.user = user;
      if (this.user === null)
        return;
      console.log('Logged in with user', this.user.email);
    });
  }


  logIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredentials => {
        this.generalAlert(
          'Signed in successfully',
          '',
          ['OK'],
        )
      })
      .catch(() => {
        this.generalAlert(
          'Wrong Credentials',
          'Incorrect Email or Password ❌',
          ['OK']
        );
      });
  }


  async generalAlert(
    header: string,
    message: string,
    buttons: any,
    inputs?: any
  ) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: buttons,
      inputs: inputs,
    });
    await alert.present();
  }
}
