import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecepiDetailsPageRoutingModule } from './recepi-details-routing.module';

import { RecepiDetailsPage } from './recepi-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepiDetailsPageRoutingModule
  ],
  declarations: [RecepiDetailsPage]
})
export class RecepiDetailsPageModule {}
