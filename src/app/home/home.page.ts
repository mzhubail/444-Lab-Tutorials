import { Component } from '@angular/core';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public devicesService: DevicesService,
  ) { }

}
