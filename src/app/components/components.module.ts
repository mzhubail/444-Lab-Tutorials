import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsPageRoutingModule } from '../settings/settings-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LaptopCardComponent } from './laptop-card/laptop-card.component';


var comopnents = [ToolbarComponent, LaptopCardComponent];

@NgModule({
  declarations: comopnents,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
  ],
  exports: comopnents,
})
export class ComponentsModule { }
