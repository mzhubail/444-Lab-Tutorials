import { Component, OnInit } from '@angular/core';
import { DataService, Product } from '../services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  product: Product = {
    Section: '',
    Category: '',
    Name: '',
    Price_history: [{
      price: 0,
      date: new Date()
    }],

    Type: '',
    Image: '',
    Specification: '',
  }

  // sectionIndex: number = -1;
  currentSection: string[] = [];

  constructor(
    public dataService: DataService,
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
}
