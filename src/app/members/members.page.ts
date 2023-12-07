import { Component, OnInit, ViewChild } from '@angular/core';
import { Member, MembersService } from '../services/members.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
