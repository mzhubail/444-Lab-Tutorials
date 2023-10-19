import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Laptop, LaptopsService } from '../laptops.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  async ngOnInit() {
    this.laptopsService.loadSavedLaptop();
  }


  constructor(
    public laptopsService: LaptopsService,
    public alertController: AlertController,
    public settingsService: SettingsService,
  ) { }

  async displayLaptopsCount() {
    var count = this.laptopsService.laptopsCount();
    var alert = await this.alertController.create({
      header: 'Info',
      message: `Number of laptops is ${count}`,
      buttons: ['Close'],
    });
    alert.present();
  }
}
