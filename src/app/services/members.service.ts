import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { faker } from '@faker-js/faker';

export interface Member {
  id?: string;
  sid: number;
  fName: string;
  lName: string;
  age: number;
  gender: "m" | "f";
  major: string;
  phone: number;
  email: string;
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

  addMember(member: Member) {
    return addDoc(
      this.membersRef,
      member,
    );
  }

  addRandom = () => this.addMember(this.randomMember());

  randomMember = (): Member => ({
    sid: faker.number.int({ min: 10000, max: 99999 }),
    fName: faker.person.firstName(),
    lName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 99 }),
    gender: faker.number.int(1) == 1 ? 'm' : 'f',
    major: faker.person.jobDescriptor(),
    phone: faker.number.int({ min: 33000000, max: 39999999 }),
    email: faker.internet.email(),
  });

  setMember(id: string, member: Member) {
    const d = doc(this.membersRef, id);
    return setDoc(d, member);
  }

  deleteMember(id: string) {
    return deleteDoc(doc(this.membersRef, id));
  }
}
