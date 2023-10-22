import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsPageRoutingModule } from '../settings/settings-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LaptopCardComponent } from './laptop-card/laptop-card.component';
import { InputComponent } from './input-components/input-components.component';


var comopnents = [
  ToolbarComponent,
  LaptopCardComponent,
  InputComponent,
];

@NgModule({
  declarations: comopnents,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsPageRoutingModule,
  ],
  exports: comopnents,
})
export class ComponentsModule { }
