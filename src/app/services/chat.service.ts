import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CollectionReference, Firestore, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from '@angular/fire/firestore';

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
  messages: Message[] = [];
  messagesRef;

  constructor(
    public authService: AuthService,
    public db: Firestore,
  ) {
    this.messagesRef =
      collection(db, 'messages') as CollectionReference<Message>;

    const messagesQuery = query(this.messagesRef, orderBy('createdAt', 'asc'));

    onSnapshot(messagesQuery, doc => {
      // Disables latency compensation
      if (doc.metadata.hasPendingWrites)
        return;
      const messages = doc
        .docs
        .map(x => x.data()) as Message[];
      this.messages = messages;
    });
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
