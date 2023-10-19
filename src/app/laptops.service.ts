import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface Laptop {
  brand: string;
  cpu: string;
  gpu: string;
  ram: number;
  weight: number;
  screen: number;
  storage: boolean;
  os: boolean;
  manuDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LaptopsService {
  public laptops: Laptop[] = [];
  public LAPTOPS_STORAGE = 'laptops';

  constructor() { }

  emptyLaptop = () => <Laptop>{
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

  async addLaptop(l: Laptop) {
    this.laptops.push(l);
    this.updateLaptopsStorage();
  }

  async loadSavedLaptop() {
    const { value } = await Preferences.get({ key: this.LAPTOPS_STORAGE });
    this.laptops = (value ? JSON.parse(value) : []) as Laptop[];
  }

  async removeLaptop(index: number) {
    this.laptops.splice(index, 1);
    this.updateLaptopsStorage();
  }

  laptopsCount = () => this.laptops.length;

  private updateLaptopsStorage() {
    return Preferences.set({
      key: this.LAPTOPS_STORAGE,
      value: JSON.stringify(this.laptops),
    });
  }
}
