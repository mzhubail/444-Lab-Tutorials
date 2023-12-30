import { Component } from '@angular/core';
import { FBService, User } from '../fb.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  users!: User[];

  constructor(public serv: FBService) {
    serv.users$.subscribe((users) => {
      this.users = users;
    });
  }

  formatName = (name: string) => (name.length === 0 ? 'NA' : name);
}
