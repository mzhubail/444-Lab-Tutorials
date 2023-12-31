import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  query,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
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

  constructor(db: Firestore, public alertController: AlertController) {
    this.reqRef = collection(
      db,
      'Printing Requests',
    ) as CollectionReference<PrintingRequest>;
    this.requests$ = collectionData(this.reqRef, { idField: 'id' });
  }

  async addPriningRequest(req: PrintingRequest) {
    // Check duplicate
    const q = query(
      this.reqRef,
      where('copiesCount', '==', req.copiesCount),
      where('paperSize', '==', req.paperSize),
      where('inkQuality', '==', req.inkQuality),
    );

    const qSnapshot = await getDocs(q);
    if (qSnapshot.docs.length !== 0) {
      this.alertDuplicate();
      return;
    }

    addDoc(this.reqRef, req)
      .then(() => {
        this.alertSuccess();
      })
      .catch(() => {
        this.alertFailure();
      });
  }

  deleteRequest(reqId: string) {
    const reqDoc = doc(this.reqRef, reqId);
    return deleteDoc(reqDoc);
  }

  alertDuplicate() {
    this.alertController
      .create({
        header: 'Error',
        message: 'There is duplicate request in the database',
        buttons: ['OK'],
      })
      .then((a) => {
        a.present();
      });
  }

  alertSuccess() {
    this.alertController
      .create({
        header: 'Success',
        message: 'Your printing request was added successfully',
        buttons: ['OK'],
      })
      .then((a) => {
        a.present();
      });
  }

  alertFailure() {
    this.alertController
      .create({
        header: 'Error',
        message: 'Could not add your request',
        buttons: ['Cancel'],
      })
      .then((a) => {
        a.present();
      });
  }
}
