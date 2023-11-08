import { Injectable } from '@angular/core';


export interface Category {
  name: string;
  nav: SubCategory[];
}

export interface SubCategory {
  name: string;
  nav: Devices;
}

export interface Devices {
  name: string;
  nav: PartialLaptop[]
}

export interface PartialLaptop {
  Brand: String,
  CPU: String,
  GPU: String,
  RAM: Number,
  Weight: Number,
  Screen: Number,
  Storage: boolean,
  OS: boolean,
  Image: String,
  ManuDate: Date
}


@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  // TODO: remove !
  data!: Category[];

  constructor() {
    this.loadLaptopsFromJSON()
  }

  async loadLaptopsFromJSON() {
    fetch('/assets/laptops.json')
      .then(res => res.json())
      .then(res => this.data = res as Category[])
  }
}
