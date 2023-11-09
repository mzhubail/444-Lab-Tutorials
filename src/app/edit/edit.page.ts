import { Component, OnInit } from '@angular/core';
import { DataService, Product } from '../services/data.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public product = this.dataService.empty_product();

  // sectionIndex: number = -1;
  currentSection: string[] = [];

  constructor(
    public dataService: DataService,
    public alertController: AlertController,
    public navController: NavController,
  ) { }

  ngOnInit() {
  }

  handleSectionChange() {
    // this.sectionIndex = index;
    // this.currentSection = this.dataService.sections[index].Category;
    this.currentSection = this.dataService.sections
      .find(s => s.Section == this.product.Section)
      ?.Category ?? []
    console.log(this.currentSection)
  }


  async backHandler() {
    this.dataService.list.unshift(this.product);
    this.product = this.dataService.empty_product();

    const alert = await this.alertController.create({
      header: 'Add',
      message: 'Added Successfully',
      buttons: [{
        text: 'OK',
        handler: () => { this.navController.navigateBack('/home') },
      }],
    });
    alert.present();
  }
}
