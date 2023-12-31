import { Component } from '@angular/core';
import { DataService, PrintingRequest } from '../data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  requests!: PrintingRequest[];

  constructor(public dataService: DataService) {
    dataService.requests$.subscribe((requests) => {
      this.requests = requests;
    });
  }
}
