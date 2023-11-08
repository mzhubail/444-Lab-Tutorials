import { Component } from '@angular/core';
import { Category, DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data!: Category[];

  constructor(
    public devicesService: DevicesService,
  ) { }

  async ngOnInit() {
    await this.devicesService.loadLaptops();
    this.data = this.devicesService.data;
  }
}
