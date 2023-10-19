import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLaptopPage } from './add-laptop.page';

const routes: Routes = [
  {
    path: '',
    component: AddLaptopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLaptopPageRoutingModule {}
