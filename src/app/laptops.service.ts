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
  image: String;
  manuDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LaptopsService {
  // public laptops: Laptop[] = [];
  public laptops: Laptop[] = [
    {
      brand: "Dell", cpu: "intel i7", gpu: "Nvidia RX3070", image: "assets/laptops/l1.jpg",
      manuDate: new Date(), os: true, ram: 16, screen: 14, storage: false, weight: 1.2,
    },
    {
      brand: "Mac", cpu: "intel i2", gpu: "AMD", image: "assets/laptops/l2.avif",
      manuDate: new Date(), os: true, ram: 12, screen: 12, storage: true, weight: 5.0,
    },
    {
      brand: "Lenovo", cpu: "intel i8", gpu: "Nvidia T-REX", image: "assets/laptops/l3.webp",
      manuDate: new Date(), os: true, ram: 16, screen: 14, storage: false, weight: 3.6,
    },
    {
      brand: "Orange", cpu: "AMD something", gpu: "Intel iris", image: "assets/laptops/l4.jpg",
      manuDate: new Date(), os: false, ram: 4, screen: 8, storage: true, weight: 3.2,
    },
  ];
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
    // const { value } = await Preferences.get({ key: this.LAPTOPS_STORAGE });
    // this.laptops = (value ? JSON.parse(value) : []) as Laptop[];
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
