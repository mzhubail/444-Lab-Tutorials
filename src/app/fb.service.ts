import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';

export interface Device {
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

  constructor(public db: Firestore) {
    this.devicesCollection = collection(
      db,
      'Devices',
    ) as CollectionReference<Device>;
  }

  addDevice(d: Device) {
    const deviceDoc = doc(this.devicesCollection);
    return setDoc(deviceDoc, d);
  }
}
