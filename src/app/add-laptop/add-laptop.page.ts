import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Laptop, LaptopsService } from '../services/laptops.service';

@Component({
  selector: 'app-add-laptop',
  templateUrl: './add-laptop.page.html',
  styleUrls: ['./add-laptop.page.scss'],
})
export class AddLaptopPage implements OnInit {

  CPU_OPTIONS = ['Intel i7', 'Intel i5', 'Intel i3', 'AMD',];
  GPU_OPTIONS = ['Apple M2 Pro', 'intel Iris', 'AMD Radeon', 'NVidia GeForce'];
  SCREEN_OPTIONS = [12, 13, 14, 15];
  segment = 'new';

  laptop: Laptop = this.laptopsService.emptyLaptop();

  mDate = new Date().toISOString();
  initialDate = this.mDate;


  async ngOnInit() {
    this.laptopsService.loadSavedLaptop();
  }

  constructor(
    private alertController: AlertController,
    public laptopsService: LaptopsService,
  ) { }

  setSegment(segment: string) { this.segment = segment; }

  async addLaptop() {
    var d = new Date(this.mDate);
    this.laptop.manuDate = d;

    this.laptopsService.addLaptop(this.laptop);

    // Create new laptop
    this.laptop = this.laptopsService.emptyLaptop();

    // Success alert
    var alert = await this.alertController.create({
      animated: true,
      buttons: ['close'],
      message: 'Laptop was inserted successfully',
      keyboardClose: true,
    });
    alert.present();
  }

  removeLaptop = (index: number) => this.laptopsService.removeLaptop(index);


  /* Helper functions for view */
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

  capitalize = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  formatISODate = (date : string) => date.substring(0, date.indexOf('T'));

}
