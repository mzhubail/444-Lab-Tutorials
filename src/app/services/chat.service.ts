import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CollectionReference, Firestore, Timestamp, addDoc, collection, collectionData, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Message {
  id?: string;
  text: string;
  createdAt: Timestamp;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages$: Observable<Message[]>;
  messagesRef;

  constructor(
    public authService: AuthService,
    public db: Firestore,
  ) {
    this.messagesRef =
      collection(db, 'messages') as CollectionReference<Message>;
    this.messages$ =
      collectionData(this.messagesRef, { idField: 'id' });
  }

  sendMessage(text: string) {
    console.log(serverTimestamp());
    if (this.authService.user)
      addDoc(
        this.messagesRef,
        {
          uid: this.authService.user.uid,
          text: text,
          createdAt: serverTimestamp(),
        },
      );
  }
}
