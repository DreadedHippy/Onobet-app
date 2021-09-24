import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetSubmitPage } from './bet-submit.page';

const routes: Routes = [
  {
    path: '',
    component: BetSubmitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetSubmitPageRoutingModule {}
