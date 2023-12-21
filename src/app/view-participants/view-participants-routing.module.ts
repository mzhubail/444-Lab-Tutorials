import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewParticipantsPage } from './view-participants.page';

const routes: Routes = [
  {
    path: '',
    component: ViewParticipantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewParticipantsPageRoutingModule {}
