import { Component } from '@angular/core';
import { FBService, User } from '../fb.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  users!: User[];
  showUser!: boolean[];

  constructor(public serv: FBService) {
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
}
