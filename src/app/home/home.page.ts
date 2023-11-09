import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public showHistoryIndex = -1;

  constructor(
    public dataService : DataService,
    public loadingCtrl : LoadingController,
  ) {}

  showHistory(index: number) {
    this.showHistoryIndex = this.showHistoryIndex == index ? -1 : index;
  }

  // async _deleteProduct(index: number) {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Deleting Product...',
  //     duration: 2000,
  //   });
  //   await loading.present();
  //   // loading.onDidDismiss = () => { this.dataService.list.splice(index, 1) };
  // }

  deleteProduct(index: number) {
    this.dataService.list.splice(index, 1);
  }
}
