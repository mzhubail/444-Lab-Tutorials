import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, docSnapshots, getDoc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Member {
  id?: string;
  sid: number;
  fName: string;
  lName: string;
  age: string;
  gender: "m" | "f";
  major: string;
  contactInfo: {
    phone?: string;
    email?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  membersRef;
  members$: Observable<Member[]>;

  constructor(
    private db: Firestore
  ) {
    this.membersRef =
      collection(db, 'members') as CollectionReference<Member>;
    this.members$ =
      collectionData(this.membersRef, { idField: 'id' }) as Observable<Member[]>;

    this.members$.subscribe(console.log);
  }

}
