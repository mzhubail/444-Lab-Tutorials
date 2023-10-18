import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  segment = 'new';
  laptop: Laptop = {
    brand: '',
    cpu: '',
    gpu: '',
    ram: 0,
    weight: 0,
    screen: 0,
    storage: false,
    os: false,
    manuDate: new Date(),
  };

  CPU_OPTIONS = ['Intel i7', 'Intel i5', 'Intel i3', 'AMD',];
  GPU_OPTIONS = ['Apple M2 Pro', 'intel Iris', 'AMD Radeon', 'NVidia GeForce'];
  SCREEN_OPTIONS = [12, 13, 14, 15];

  mDate = new Date().toISOString();
  initialDate = this.mDate;


  constructor() { }

  setSegment(segment: string) { this.segment = segment; }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  formatISODate = (date : string) => date.substring(0, date.indexOf('T'));
}


interface Laptop {
  brand: string,
  cpu: string,
  gpu: string,
  ram: number,
  weight: number,
  screen: number,
  storage: boolean,
  os: boolean,
  manuDate: Date,
}
