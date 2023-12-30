import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';

export interface User {
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

  constructor(db: Firestore) {
    this.usersCollection = collection(db, 'Users') as CollectionReference<User>;
  }

  addUser(user: User) {
    return addDoc(this.usersCollection, user);
  }
}
