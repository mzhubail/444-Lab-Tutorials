import { Component } from '@angular/core';
import { Device, FbService } from '../fb.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  devices!: Device[];

  constructor(public fbService: FbService) {
    fbService.devices$.subscribe((devices) => {
      this.devices = devices;
    });
  }
}
