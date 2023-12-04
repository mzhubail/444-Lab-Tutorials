import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CollectionReference, Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { faker } from '@faker-js/faker';
import { Observable, Subscription } from 'rxjs';

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
  subscription: Subscription | undefined;

  constructor(
    public authService: AuthService,
    private db: Firestore,
  ) {
    this.stuffRef = collection(db, 'stuff') as CollectionReference<thing>;
    authService.user$.subscribe(
      _ => { this.getStuff(); }
    );
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

      this.subscription = o.subscribe(data => {
        this.stuff = data;
        console.log(this.stuff);
      });
    }
    else
    {
      if (this.subscription !== undefined)
        this.subscription.unsubscribe()
      console.log('No');
    }
  }
}

interface thing {
  id?: string;
  uid: string;
  s: string;
  n: number;
}
