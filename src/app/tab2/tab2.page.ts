import { Component } from '@angular/core';
import { DataService, PrintingRequest } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  requests!: PrintingRequest[];
  filteredRequests!: PrintingRequest[];

  props = {
    isSorted: false,
    searchTerm: '',
  };

  constructor(
    public dataService: DataService,
    public alertController: AlertController,
  ) {
    dataService.requests$.subscribe((requests) => {
      this.requests = requests;
      this.filter();
    });
  }

  //// Sort related ////
  filter() {
    let l = [...this.requests];

    // Sort
    if (this.props.isSorted) {
      l.sort((_a, _b): number => {
        const a = _a.copiesCount,
          b = _b.copiesCount;
        if (a < b) {
          return -1;
        } else if (a > b) {
          return +1;
        } else {
          return 0;
        }
      });
    }

    // Search
    const searchTerm = this.props.searchTerm;
    if (searchTerm !== '') {
      l = l.filter((req) => req.paperSize === searchTerm);
    }

    this.filteredRequests = l;
  }

  //// Delete related ////
  async _delete(req: PrintingRequest) {
    const reqId = req.id;
    if (reqId === undefined) return;

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this request?',
      buttons: [
        'Cancel',
        {
          text: 'Confirm',
          handler: () => {
            this.actuallyDelete(reqId);
          },
        },
      ],
    });
    alert.present();
  }

  actuallyDelete(reqId: string) {
    this.dataService.deleteRequest(reqId);
  }
}
