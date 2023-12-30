import { Component } from '@angular/core';
import { Device, History, FbService } from '../fb.service';
import { AlertController, IonCheckbox } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  devices!: Device[];
  histories: { [index: number]: Observable<History[]> } = {};

  constructor(
    public fbService: FbService,
    public alertController: AlertController,
  ) {
    fbService.devices$.subscribe((devices) => {
      this.devices = devices;
    });
  }

  repairDevice(d: Device) {
    this.fbService.repairDevice(d);
  }

  toggleHistory(checked: boolean, index: number, device: Device) {
    if (checked) {
      if (this.histories[index] !== undefined) return;
      const x = this.fbService.getHistory(device.serial);
      this.histories[index] = x;
    } else {
      delete this.histories[index];
    }
  }

  _delete(device: Device) {
    this.fbService.deleteDevice(device);
  }

  async deleteAllChecked() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete all the selected devices?',
      buttons: [
        'Cancel',
        {
          text: 'Confirm',
          handler: () => {
            this._deleteAllChecked();
          },
        }
      ]
    });
    alert.present();
  }

  _deleteAllChecked() {
    Object.keys(this.histories)
      .map((index) => Number(index))
      .map((index) => this.devices[index])
      .forEach((device) => {
        this.fbService.deleteDevice(device);
      });
    this.histories = {};
  }
}
