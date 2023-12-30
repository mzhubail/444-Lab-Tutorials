import { Component } from '@angular/core';
import { Device, History, FbService } from '../fb.service';
import { IonCheckbox } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  devices!: Device[];
  histories: { [index: number]: Observable<History[]> } = {};

  constructor(public fbService: FbService) {
    fbService.devices$.subscribe((devices) => {
      this.devices = devices;
    });
  }

  repairDevice(d: Device) {
    this.fbService.repairDevice(d);
  }

  toggleHistory(index: number, device: Device) {
    const x = this.fbService.getHistory(device.serial);
    this.histories[index] = x;
  }
}
