import { Component } from '@angular/core';
import { FBService, User } from '../fb.service';
import { LoadingController } from '@ionic/angular';

declare var dynamics: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  users!: User[];
  showUser!: boolean[];

  constructor(
    public serv: FBService,
    public LoadingController: LoadingController,
  ) {
    serv.users$.subscribe((users) => {
      this.users = users;

      this.showUser = [];
      for (let i = 0; i < users.length; i++) {
        this.showUser.push(false);
      }
    });
  }

  formatName = (name: string) => (name.length === 0 ? 'NA' : name);

  countShifts = (u: User) => {
    const out: number[] = [];
    u.shift.forEach((s) => {
      if (s) out.push(1);
    });
    return out;
  };

  async animate(e: EventTarget | null) {
    const loading = await this.LoadingController.create({
      message: 'Please wait',
    });
    loading.present();

    // setTimeout(() => {
    //   loading.dismiss();
    // }, 1500);

    if (!e) return;
    dynamics.animate(
      e,
      {
        translateY: 0,
        translateX: 100,
      },
      {
        type: dynamics.linear,
        duration: 1500,
        complete: () => {
          loading.dismiss();
        },
      },
    );
  }

  _delete(user: User) {
    this.serv.deleteUser(user);
  }
}
