import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface PrintingRequest {
  id?: string;
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
  requests$: Observable<PrintingRequest[]>;

  constructor(db: Firestore) {
    this.reqRef = collection(
      db,
      'Printing Requests',
    ) as CollectionReference<PrintingRequest>;
    this.requests$ = collectionData(this.reqRef, { idField: 'id' });
  }

  addPriningRequest(req: PrintingRequest) {
    return addDoc(this.reqRef, req);
  }
}
