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
    this.dataService
      .addPriningRequest(this.props)
      .then(() => {
        this.alertSuccess();
      })
      .catch(() => {
        this.alertFailure();
      });
  }

  alertSuccess() {
    this.alertController
      .create({
        header: 'Success',
        message: 'Your printing request was added successfully',
        buttons: ['OK'],
      })
      .then((a) => {
        a.present();
      });
  }

  alertFailure() {
    this.alertController
      .create({
        header: 'Error',
        message: 'Could not add your request',
        buttons: ['Cancel'],
      })
      .then((a) => {
        a.present();
      });
  }
}
