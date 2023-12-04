import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { IonicModule } from '@ionic/angular';

const arr = [ChatComponent];

@NgModule({
  declarations: arr,
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: arr,
})
export class ComponentsModule { }
