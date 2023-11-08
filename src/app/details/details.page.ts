import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DevicesService, SubCategory } from '../services/devices.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public isEditable = false;
  i: any;
  j: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController : NavController,
    public devicesService : DevicesService,
  ) { }

  subCategory: SubCategory = { name: 'Details', nav: [] };

  async ngOnInit() {
    this.i = this.getParam('i'),
    this.j = this.getParam('j');

    await this.devicesService.loadLaptops()
    this.subCategory = this.devicesService.data[this.i].nav[this.j]
  }

  getParam(name : string) {
    var _param = this.activatedRoute.snapshot.paramMap.get(name);
    if (_param == null) {
      this.navController.navigateForward('/home');
    }
    var n = Number(_param);
    return n;
  }

  toggleEditable() {
    this.isEditable = !this.isEditable;
    if (!this.isEditable) {
      this.devicesService.saveData()
      // console.log(`Current`, this.subCategory)
      // console.log(`To be saved`, this.devicesService.data[this.i].nav[this.j])
    }
  }

  AddLaptop(devices_index: number) {
    const device = this.subCategory.nav[devices_index];

    device.nav.push(
      {...device.nav[-1]}
    );
    console.log(this.subCategory)
  }
}
