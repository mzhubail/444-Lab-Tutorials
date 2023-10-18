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


  async ngOnInit() {
    this.laptopsService.load_saved_laptops();
  }

  constructor(
    private alertController: AlertController,
    public laptopsService: LaptopsService,
  ) { }

  setSegment(segment: string) { this.segment = segment; }

  capitalize = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  formatISODate = (date : string) => date.substring(0, date.indexOf('T'));

  async add_laptop() {
    var d = new Date(this.mDate);
    this.laptop.manuDate = d;

    this.laptopsService.add_laptop(this.laptop);

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

  accordion_helper = (l: Laptop) => <any>{
    'CPU': l.cpu == '' ? 'NA' : l.cpu,
    'GPU': l.gpu == '' ? 'NA' : l.gpu,
    'RAM': l.ram == 0  ? 'NA' : l.ram,
    'Weight': l.weight == 0 ? 'NA' : l.weight,
    'Screen': l.screen == 0 ? 'NA' : `${l.screen} inches`,
    'Storage': l.storage ? 'HDD' : 'SSD',
    'OS': l.os ? 'Yes' : 'No',
    // 'manuDate': l.manuDate.toDateString ? l.manuDate.toDateString() : l.manuDate.toString(),
    'manuDate': this.formatISODate(
      l.manuDate.toString()
    ),
  };

  remove_laptop = (index: number) => this.laptopsService.remove_laptop(index);
}
