import { Component } from '@angular/core';
import { DataService, Product } from '../services/data.service';
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
    this.showHistoryIndex = -1;
    this.dataService.list.splice(index, 1);
  }

  list_helper(ps: Product[]): Product[] {
    return ps.map(
      p => ({
        Section: p.Section == '' ? 'NA' : p.Section,
        Category: p.Category == '' ? 'NA' : p.Category,
        Name: p.Name == '' ? 'NA' : p.Name,
        Price_history: p.Price_history,
        Type: p.Type == '' ? 'NA' : p.Type,
        Image: p.Image == '' ? 'placeholder.png' : p.Image,
        Specification: p.Specification == '' ? 'NA' : p.Specification,
      })
    );
  }
}
