import { Component, OnInit } from '@angular/core';
import { Activity, ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.page.html',
  styleUrls: ['./view-activities.page.scss'],
})
export class ViewActivitiesPage implements OnInit {
  activities!: Activity[];

  constructor(
    public activityService: ActivityService,
  ) {
    activityService.activities$.subscribe(data => {
      this.activities = data;
    });
  }

  ngOnInit() {
  }

  formatDate(ISOString: string) {
    const date = new Date(ISOString);
    return date.toDateString();
  }
}
