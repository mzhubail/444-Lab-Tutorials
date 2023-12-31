import { Component } from '@angular/core';
import { DataService, PrintingRequest } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  props: PrintingRequest = {
    copiesCount: 1,
    inkQuality: 'low',
    paperSize: 'letter',
    hasPrintDate: false,
    withBorders: false,
  };

  isCopiesCountValid = (): boolean =>
    this.props.copiesCount > 0 && this.props.copiesCount <= 10;

  constructor(
    public dataService: DataService,
    public alertController: AlertController,
  ) {}

  async submit() {
    if (!this.isCopiesCountValid()) {
      console.error('Invalid');
      return;
    }

    // Note that input with type number allows for fractional numbers (we don't
    // want that)
    this.props.copiesCount = Math.floor(this.props.copiesCount);
    if (this.props.copiesCount === 0) this.props.copiesCount = 1;

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to send this request?',
      buttons: [
        'Cancel',
        {
          text: 'Confirm',
          handler: () => {
            this.sendRequest();
          },
        },
      ],
    });
    alert.present();
  }

  sendRequest() {
    this.dataService.addPriningRequest(this.props);
  }
}
