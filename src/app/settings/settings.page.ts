import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public settingsService: SettingsService,
  ) { }

  ngOnInit() {
  }

  /* Saves BarColor in local storage then the user leaves the page */
  // ionViewWillLeave() {
  //   this.settingsService.updateBarColor();
  // }

}
