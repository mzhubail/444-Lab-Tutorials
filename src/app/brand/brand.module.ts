import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandPageRoutingModule } from './brand-routing.module';

import { BrandPage } from './brand.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [BrandPage]
})
export class BrandPageModule {}
