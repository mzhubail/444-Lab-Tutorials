import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent  implements OnInit {
  @Input() title: string = 'Title';
  @Input() showNavButtons: boolean = true;

  constructor(
    public settingsService: SettingsService,
  ) { }

  ngOnInit() {}

}
