import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, docSnapshots, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { faker } from '@faker-js/faker';
import { Observable, Subscriber, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email = '';
  password = '';
  // stuff : thing[] = []
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
        where("uid", "==", "vTaiEZjKRtQMy3Rr4pKpNxbU5xR2"),
      )

      // onSnapshot(
      //   q,
      //   qSanpshot => {
      //     console.log(qSanpshot);
      //   }
      // );
      // onSnapshot(
      //   q,
      //   qSanpshot => {
      //     // console.log(qSanpshot);
      //     qSanpshot.forEach(
      //       res => console.log(res.data())
      //     );
      //   }
      // );

      // const f = observer => { onSnapshot(q, observer); };
      const o = this.toObservable<QuerySnapshot<DocumentData, DocumentData>>((observer: any) => { onSnapshot(q, observer); });

      // const o = new Observable(observer => { onSnapshot(q, observer); });
      // o.subscribe(qSanpshot => {
      //   console.log(qSanpshot);
      //   // qSanpshot.forEach(
      //   //   doc => {console.log((doc.data() as thing).n) }
      //   // );
      //   const data = qSanpshot.docs
      //     .map(doc => doc.data() as thing)
      //   this.stuff = data;
      // });

      const user_docs = o.pipe(map(qSanpshot => {
        console.log(qSanpshot);
        const data = qSanpshot.docs
          .map(doc => doc.data() as thing)
        return data;
      }));

      this.stuff$ = user_docs;
      user_docs.subscribe(console.log);
      user_docs.subscribe(data => {
        this.stuff = data;
        console.log(this.stuff);
      });

      // const data = await getDocs(q);

      // console.log(data);
    }
    else
      console.log('No');
  }

  toObservable<T>(f: (s: Subscriber<T>) => void) {
    // toObservable<T>(f: any) {
    // const o = new Observable(observer => { onSnapshot(q, observer); });
    return new Observable(f);
  }

  // fromFunction$<T>(factory: () => T): Observable<T> {
  //   return Observable.create((observer: Subscriber<T>) => {
  //     try {
  //       observer.next(factory());
  //       observer.complete();
  //     } catch (error) {
  //       observer.error(error);
  //     }
  //   });
  // }
}

interface thing {
  uid: string;
  s: string;
  n: number;
}
