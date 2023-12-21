import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewParticipantsPageRoutingModule } from './view-participants-routing.module';

import { ViewParticipantsPage } from './view-participants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewParticipantsPageRoutingModule
  ],
  declarations: [ViewParticipantsPage]
})
export class ViewParticipantsPageModule {}
