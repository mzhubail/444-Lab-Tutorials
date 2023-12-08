import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  text = '';
  messages: Message[] = [];

  constructor(
    public chatService: ChatService,
    public authService: AuthService,
  ) {
    chatService.messages$
      .subscribe(messages => {
        this.messages = messages;
      });
  }

  ngOnInit() { }

  /* Scroll to last child of chatArea */
  scroll() {
    const elem = this.messagesContainer.nativeElement;
    const children = elem.childNodes;
    children[children.length - 2]
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  sendMessage() {
    this.chatService.sendMessage(this.text);
  }

  isSent = (m: Message) => m.uid === this.authService.user?.uid;

  formatTimestamp = (t: Timestamp) => t.toDate()
    .toISOString()
    .match(/\d+:\d+/)
    ?.[0];
}
