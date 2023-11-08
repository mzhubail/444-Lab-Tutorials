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

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController : NavController,
    public devicesService : DevicesService,
  ) { }

  subCategory: SubCategory = { name: 'Details', nav: [] };

  async ngOnInit() {
    var i = this.getParam('i'),
      j = this.getParam('j');

    await this.devicesService.data.then(data => {
      this.subCategory = data[i].nav[j]
    });
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
