import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, arrayUnion, collection, collectionData, deleteDoc, doc, documentId, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { faker } from '@faker-js/faker';
import { getDocs } from '@firebase/firestore';
import { AuthService } from './auth.service';
import { AlertController } from '@ionic/angular';

export interface Activity {
  id?: string,
  title: string,
  date: string,
  duration: string,
  venue: string,
  partCount: number,
  topic: string,
  participations?: string[],
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activityRef;
  activities$: Observable<Activity[]>;
  private activities!: Activity[];

  constructor(
    db: Firestore,
    public authService: AuthService,
    public alertController: AlertController,
  ) {
    this.activityRef =
      collection(db, 'activities') as CollectionReference<Activity>;
    this.activities$ = collectionData(
      this.activityRef,
      { idField: 'id' }
    ) as Observable<Activity[]>;

    this.activities$.subscribe(data => {
      this.activities = data;
    });
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


  /**
   * Make current user participate in a given activity.
   *
   * Does nothing if user is not logged in, or there is no activity with the
   * given id.  Displays Error alert in case the user is already a participant
   * in this activity.
   *
   * @param activityId id of activity
   */
  participateInActivity(activityId: string | undefined) {
    const uid = this.authService.user?.uid;
    if (!uid)
      return;

    if (this.isParticipant(activityId)) {
      this.alertDuplicateParticipation();
      return;
    }

    const activityDoc = doc(this.activityRef, activityId);
    updateDoc(activityDoc, {
      participations: arrayUnion(uid),
    });
  }


  /**
   * Check if the current user is already a participant in a given activity.
   *
   * Does nothing if user is not logged in, or there is no activity with the
   * given id.
   *
   * @param activityId id of activity
   */
  public isParticipant(activityId: string | undefined) {
    const uid = this.authService.user?.uid;
    if (!uid)
      return;

    const activity = this.activities
      .find(a => a.id === activityId);
    if (!activity) {
      console.error(`Failed to find activity ${activityId}`);
      return;
    }

    return activity.participations?.includes(uid) ?? false;
  }


  async alertDuplicateParticipation() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Already participant in this activity.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
