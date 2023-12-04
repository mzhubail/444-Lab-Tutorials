import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chatArea') chatArea!: ElementRef;

  constructor() { }

  ngOnInit() { }

  /* Scroll to last child of chatArea */
  scroll() {
    const container = this.chatArea.nativeElement;
    const children = container.childNodes;
    children[children.length - 2]
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
