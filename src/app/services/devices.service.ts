import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


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
  readonly DEVICES_STORAGE = 'devices';

  data!: Category[];

  constructor(
    public storage: Storage,
  ) { }

  // Called when entering application
  async loadDevices() {
    await this.storage.create();
    const value = await this.storage.get(this.DEVICES_STORAGE);

    if (value == null) {
      // console.log('No value in storage')
      this.loadDevicesFromJSONFile();
      return;
    }

    // console.log(`found ${value} in storage`)
    this.data = value as Category[]
  }

  async loadDevicesFromLocalStorage() {
    const value = await this.storage.get(this.DEVICES_STORAGE);
    this.data = ( value ? value : [] ) as Category[]
  }

  async loadDevicesFromJSONFile() {
    const fromFile = await fetch('/assets/laptops.json')
      .then(res => res.json());

    console.log(`Loaded ${JSON.stringify(fromFile)}`)
    this.data = fromFile as Category[];
  }

  async saveData() {
    // console.log(`Saving`)
    // console.log(`Saving ${JSON.stringify(data)}`)
    this.storage.set(
      this.DEVICES_STORAGE,
      this.data,
    )
  }
}
