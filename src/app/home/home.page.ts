import { Component } from '@angular/core';
import { Category, DevicesService } from '../services/devices.service';
import { AlertButton } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data!: Category[];

  public alertButtons : AlertButton[] = [
    {
      text: 'From File',
      role: 'close',
      handler: () => this.devicesService.loadDevicesFromJSONFile(),
    },
    {
      text: 'From Storage',
      role: 'close',
      handler: () => this.devicesService.loadDevicesFromLocalStorage(),
    },
  ];

  constructor(
    public devicesService: DevicesService,
  ) { }

  async ngOnInit() {
    await this.devicesService.loadDevices();
    this.data = this.devicesService.data;
  }
}
