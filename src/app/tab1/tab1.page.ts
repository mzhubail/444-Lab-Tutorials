import { Component } from '@angular/core';
import { DataService, PrintingRequest } from '../data.service';

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

  constructor(public dataService: DataService) {}

  submit() {
  }
}
