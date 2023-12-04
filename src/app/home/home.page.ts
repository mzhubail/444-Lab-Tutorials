import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { faker } from '@faker-js/faker';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email = '';
  password = '';
  stuff$: Observable<thing[]> | undefined;
  stuff: thing[] = [];

  stuffRef;

  constructor(
    public authService: AuthService,
    private db: Firestore,
  ) {
    this.stuffRef = collection(db, 'stuff');
    this.getStuff();
  }

  addRandomThing() {
    if (this.authService.user)
      addDoc(this.stuffRef, {
        uid: this.authService.user.uid,
        s: faker.color.human(),
        n: faker.number.int(100),
      });
  }

  async getStuff() {
    if (this.authService.user) {
      const q = query(
        this.stuffRef,
        where("uid", "==", this.authService.user.uid),
      )

      const o = collectionData(q, { idField: 'id' }) as Observable<thing[]>;
      this.stuff$ = o;

      o.subscribe(console.log);
      o.subscribe(data => {
        this.stuff = data;
        // console.log(this.stuff);
      });
    }
    else
      console.log('No');
  }
}

interface thing {
  uid: string;
  s: string;
  n: number;
}
