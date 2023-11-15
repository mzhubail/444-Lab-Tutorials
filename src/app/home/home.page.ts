import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showAdd = false;

  constructor(
    public dataService: DataService,
  ) {}

  toggleShowAdd() {
    this.showAdd = !this.showAdd;
  }
}
