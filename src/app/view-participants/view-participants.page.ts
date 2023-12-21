import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.page.html',
  styleUrls: ['./view-participants.page.scss'],
})
export class ViewParticipantsPage implements OnInit {
  participantId: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public navController: NavController,
  ) {
    const participantId = activatedRoute.snapshot.paramMap.get('id');
    if (!participantId)
      this.navController.navigateRoot('/');

    this.participantId = participantId as string;
  }

  ngOnInit() {
  }

}
