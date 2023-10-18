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

  empty_laptop = () => <Laptop>{
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

  async add_laptop(l : Laptop) {
    this.laptops.push(l);
    this.update_laptops_storage();
  }

  async load_saved_laptops() {
    const { value } = await Preferences.get({ key: this.LAPTOPS_STORAGE });
    this.laptops = (value ? JSON.parse(value) : []) as Laptop[];
  }

  // async remove_laptop(l: Laptop) {
  async remove_laptop(index: number) {
    // this.laptops.unshift(l);
    this.laptops.splice(index, 1);
    this.update_laptops_storage();
  }

  private update_laptops_storage() {
    return Preferences.set({
      key: this.LAPTOPS_STORAGE,
      value: JSON.stringify(this.laptops),
    });
  }
}
