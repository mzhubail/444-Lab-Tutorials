import { Component, OnInit } from '@angular/core';
import { LaptopsService } from '../laptops.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html',
  styleUrls: ['./brand.page.scss'],
})
export class BrandPage implements OnInit {

  constructor(
    public laptopsService: LaptopsService,
  ) { }

  async ngOnInit() {
    this.laptopsService.loadSavedLaptop();
  }

}
