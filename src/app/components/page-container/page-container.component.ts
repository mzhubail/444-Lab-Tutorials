import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/settings.service';


@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent  implements OnInit {

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit() { }

}
