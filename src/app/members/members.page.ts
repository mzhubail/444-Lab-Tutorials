import { Component, OnInit } from '@angular/core';
import { Member, MembersService } from '../services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  members: Member[] | undefined;

  constructor(
    public membersService: MembersService,
  ) {
    membersService.members$.subscribe(data =>{
      this.members = data;
    });
  }

  ngOnInit() {
  }

}
