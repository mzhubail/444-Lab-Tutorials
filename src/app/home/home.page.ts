import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Laptop, LaptopsService } from '../laptops.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  CPU_OPTIONS = ['Intel i7', 'Intel i5', 'Intel i3', 'AMD',];
  GPU_OPTIONS = ['Apple M2 Pro', 'intel Iris', 'AMD Radeon', 'NVidia GeForce'];
  SCREEN_OPTIONS = [12, 13, 14, 15];
  segment = 'new';

  laptop: Laptop = this.laptopsService.empty_laptop();

  mDate = new Date().toISOString();
  initialDate = this.mDate;


  constructor(
    private alertController: AlertController,
    private laptopsService: LaptopsService,
  ) { }

  setSegment(segment: string) { this.segment = segment; }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  formatISODate = (date : string) => date.substring(0, date.indexOf('T'));

  async add_laptop() {
    var d = new Date(this.mDate);
    this.laptop.manuDate = d;

    this.laptopsService.laptops.push(this.laptop);

    // Create new laptop
    this.laptop = this.laptopsService.empty_laptop();

    // Success alert
    var alert = await this.alertController.create({
      animated: true,
      buttons: ['close'],
      message: 'Laptop was inserted successfully',
      keyboardClose: true,
    });
    alert.present();
  }
}
