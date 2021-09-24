import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BetSubmitPageRoutingModule } from './bet-submit-routing.module';

import { BetSubmitPage } from './bet-submit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BetSubmitPageRoutingModule
  ],
  declarations: [BetSubmitPage]
})
export class BetSubmitPageModule {}
