import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public showHistoryIndex = -1;

  constructor(
    public dataService : DataService,
  ) {}

  showHistory(index: number) {
    this.showHistoryIndex = this.showHistoryIndex == index ? -1 : index;
  }
}
