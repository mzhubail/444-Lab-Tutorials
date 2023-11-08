import { Injectable } from '@angular/core';


export interface Category {
  name: string;
  nav: SubCategory[];
}

export interface SubCategory {
  name: string;
  nav: Device[];
}

export interface Device {
  name: string;
  nav: PartialDevice[]
}

export interface PartialDevice {
  cpu: String,
  ram: String,
  storage: String,
  screen: String,
}


@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  // TODO: remove !
  data!: Promise<Category[]>;

  constructor() {
    this.loadLaptopsFromJSON()
  }

  async loadLaptopsFromJSON() {
    this.data = fetch('/assets/laptops.json')
      .then(res => res.json()) as Promise<Category[]>
  }
}
