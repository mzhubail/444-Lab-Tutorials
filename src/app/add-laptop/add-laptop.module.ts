import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLaptopPageRoutingModule } from './add-laptop-routing.module';

import { AddLaptopPage } from './add-laptop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLaptopPageRoutingModule
  ],
  declarations: [AddLaptopPage]
})
export class AddLaptopPageModule {}
