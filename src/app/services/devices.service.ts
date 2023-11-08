import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


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

  constructor() { }

  async loadDevices() {
    const { value } = await Preferences.get({ key: this.DEVICES_STORAGE })

    if (value == null) {
      // console.log('No value in storage')
      this.loadDevicesFromJSONFile();
      return;
    }

    // console.log(`found ${value} in storage`)
    this.data = JSON.parse(value) as Category[]
  }

  async loadDevicesFromLocalStorage() {
    const { value } = await Preferences.get({ key: this.DEVICES_STORAGE })
    this.data = ( value ? JSON.parse(value) : [] ) as Category[]
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
    Preferences.set({
      key: this.DEVICES_STORAGE,
      value: JSON.stringify(this.data),
    })
  }
}
