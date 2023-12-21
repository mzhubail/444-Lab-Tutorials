import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActivityService } from '../services/activity.service';
import { Member, MembersService } from '../services/members.service';

@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.page.html',
  styleUrls: ['./view-participants.page.scss'],
})
export class ViewParticipantsPage implements OnInit {
  activityId: string;
  members!: Member[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public navController: NavController,
    public activityService: ActivityService,
    public membersService: MembersService,
  ) {
    const activityId = activatedRoute.snapshot.paramMap.get('id');
    if (!activityId)
      this.navController.navigateRoot('/');

    this.activityId = activityId as string;


    membersService.members$.subscribe(members => {
      this.members = members
        .filter(member =>
          activityService.memberIsParticipant(this.activityId, member.id)
        );
    });
  }

  ngOnInit() {
  }
}
