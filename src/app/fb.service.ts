import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Device {
  id?: string;
  serial: string;
  model: string;
  weight: string;
  year: Date;
}

export interface History {
  serial: string;
  repairDate: Date;
  cost: number;
}

@Injectable({
  providedIn: 'root',
})
export class FbService {
  public devicesCollection;
  public devices$: Observable<Device[]>;

  constructor(public db: Firestore) {
    this.devicesCollection = collection(
      db,
      'Devices',
    ) as CollectionReference<Device>;
    this.devices$ = collectionData(this.devicesCollection, { idField: 'id' });
  }

  addDevice(d: Device) {
    const deviceDoc = doc(this.devicesCollection);
    return setDoc(deviceDoc, d);
  }

  async addRandomDevice() {
    const faker = await import('@faker-js/faker').then((f) => f.faker);

    const device = {
      model: faker.helpers.arrayElement(['Version1', 'Version2', 'Version3']),
      serial: faker.airline.flightNumber(),
      weight: faker.helpers.arrayElement(['Light', 'Normal', 'Heavy']),
      year: faker.date.past({ years: 10 }),
    };
    this.addDevice(device);
  }
}
