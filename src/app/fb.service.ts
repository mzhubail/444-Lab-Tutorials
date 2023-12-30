import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User {
  id?: string;
  name: string;
  shift: boolean[];
  quantity: number;
  status: string;
  approved: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FBService {
  public shifts = {
    morning: 'Morning Shift',
    afternoon: 'Afternoon Shift',
    night: 'Night Shift',
  };

  usersCollection;
  users$: Observable<User[]>;

  constructor(db: Firestore) {
    this.usersCollection = collection(db, 'Users') as CollectionReference<User>;
    this.users$ = collectionData(this.usersCollection, { idField: 'id' });
  }

  addUser(user: User) {
    return addDoc(this.usersCollection, user);
  }

  deleteUser(user: User) {
    if (user.id === undefined) return;
    const userDoc = doc(this.usersCollection, user.id);
    return deleteDoc(userDoc);
  }
}
