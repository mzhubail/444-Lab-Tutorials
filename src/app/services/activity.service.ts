import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { faker } from '@faker-js/faker';

export interface Activity {
  id?: string,
  title: string,
  date: string,
  duration: string,
  venue: string,
  partCount: number,
  topic: string,
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activityRef;
  activities$: Observable<Activity[]>;

  constructor(
    db: Firestore,
  ) {
    this.activityRef =
      collection(db, 'activities') as CollectionReference<Activity>;
    this.activities$ = collectionData(
      this.activityRef,
      { idField: 'id' }
    ) as Observable<Activity[]>;

  }

  addActivity(activity: Activity) {
    return addDoc(
      this.activityRef,
      activity,
    );
  }

  addRandom = () => this.addActivity(this.randomActivity());

  randomActivity(): Activity {
    const
      _duration = faker.date.recent({ days: 1 }),
      duration = _duration.getHours().toString().padStart(2, '0') + ':' +
        _duration.getMinutes().toString().padStart(2, '0');

    return {
      date: faker.date.past({ years: 1 }).toISOString(),
      duration: duration,
      partCount: faker.helpers.rangeToNumber({ min: 20, max: 500 }),
      title: faker.company.catchPhrase(),
      topic: faker.helpers.arrayElement(
        ['Cultural', 'Scientific', 'Competition', 'Organization', 'General']
      ),
      venue: faker.location.city() + ' venue',
    }
  }


  setActivity(id: string, activity: Activity) {
    const d = doc(this.activityRef, id);
    return setDoc(d, activity);
  }


  deleteActivity(id: string) {
    return deleteDoc(doc(this.activityRef, id));
  }
}
