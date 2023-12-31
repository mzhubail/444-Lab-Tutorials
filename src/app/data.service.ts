import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';

export interface PrintingRequest {
  copiesCount: number;
  paperSize: 'A3' | 'A4' | 'A5' | 'B5' | 'letter';
  inkQuality: 'low' | 'medium' | 'hight';
  hasPrintDate: boolean;
  withBorders: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  PAPERSIZES = ['A3', 'A4', 'A5', 'B5', 'letter'];
  INKQUALITY = ['low', 'medium', 'high'];

  reqRef;

  constructor(db: Firestore) {
    this.reqRef = collection(
      db,
      'Printing Requests',
    ) as CollectionReference<PrintingRequest>;
  }

  addPriningRequest(req: PrintingRequest) {
    return addDoc(this.reqRef, req);
  }
}
