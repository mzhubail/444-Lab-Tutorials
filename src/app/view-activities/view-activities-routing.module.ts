import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewActivitiesPage } from './view-activities.page';

const routes: Routes = [
  {
    path: '',
    component: ViewActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewActivitiesPageRoutingModule {}
