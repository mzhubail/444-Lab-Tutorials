import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor() { }

  ngOnInit() { }

  /* Scroll to last child of chatArea */
  scroll() {
    const elem = this.messagesContainer.nativeElement;
    const children = elem.childNodes;
    children[children.length - 2]
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
