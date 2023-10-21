import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLaptopPageRoutingModule } from './add-laptop-routing.module';

import { AddLaptopPage } from './add-laptop.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddLaptopPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddLaptopPage]
})
export class AddLaptopPageModule {}
