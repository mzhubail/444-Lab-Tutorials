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

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController : NavController,
    public devicesService : DevicesService,
  ) { }

  i!: number;
  j!: number;
  subCategory!: SubCategory;

  ngOnInit() {
    this.i = this.getParam('i');
    this.j = this.getParam('j');
    // console.log(this.devicesService.data[this.i].nav[this.j])
    this.subCategory = this.devicesService.data[this.i].nav[this.j];
    console.log(this.subCategory)
  }

  getParam(name : string) {
    var _param = this.activatedRoute.snapshot.paramMap.get(name);
    // console.log(_param);
    if (_param == null) {
      this.navController.navigateForward('/home');
    }
    var n = Number(_param);
    return n;
  }
}
