import { Component } from '@angular/core';
import { FBService } from '../fb.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(public serv: FBService) {}
}
