import { Component } from '@angular/core';
import { DataService, Product } from '../services/data.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public showHistoryIndex = -1;

  constructor(
    public dataService: DataService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
  ) { }

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

  public filteredProducts: Product[] | null = null;
  public searchPhrase: string = '';

  filterHandler() {
    this.filteredProducts = this.dataService.list
      .filter(p => p.Name == this.searchPhrase)
  }

  async saveHandler() {
    if (this.filteredProducts == null) {
      const alert = await this.alertController.create({
        message: 'You have to filter First',
        buttons: ['OK'],
      });
      alert.present();
      return;
    }

    var alert = await this.alertController.create({
      header: 'Save',
      message: 'Confirm to save filtered list?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            Preferences.set({
              key: 'filtered_products',
              value: JSON.stringify(this.filteredProducts),
            })
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ],
    });
    alert.present();


  }
}
