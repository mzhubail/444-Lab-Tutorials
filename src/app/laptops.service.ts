import { Injectable } from '@angular/core';

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
}
