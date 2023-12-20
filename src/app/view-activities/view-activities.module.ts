import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewActivitiesPageRoutingModule } from './view-activities-routing.module';

import { ViewActivitiesPage } from './view-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewActivitiesPageRoutingModule
  ],
  declarations: [ViewActivitiesPage]
})
export class ViewActivitiesPageModule {}
