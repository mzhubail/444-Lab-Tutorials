import { Injectable, OnInit } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';

import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Member, MembersService } from './members.service';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // User related variables
  user!: User | null;
  member!: Member | null;

  private memberSub: Subscription | undefined;


  constructor(
    private auth: Auth,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private membersService: MembersService,
  ) {
    auth.onAuthStateChanged(user => {
      // Set user
      this.user = user;
      if (this.user === null)
        return;
      console.log('Logged in with user', this.user.email);


      if (this.memberSub)
        this.memberSub.unsubscribe();

      // Set member
      this.memberSub =  membersService.members$
        .subscribe(members => {
          const member = members.find(m => m.id === this.user?.uid);
          if (!member) {
            console.error(
              'User role was not retrieved correctly.\n\n Make sure that the ' +
              'corresponding userInfo for the user is stored in ' +
              '\'User Information\' with the same id as the current user id.'
            );
            this.member = null;
          } else {
            this.member = member;
          }

          console.log('Using member', member);
        });
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





  signOut() {
    signOut(this.auth)
      .then(() => {
        this.navCtrl.navigateBack('/login');
      })
      .catch(() => {
        this.generalAlert(
          'Fail',
          'Sorry, there is a problem signing you out ❌',
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