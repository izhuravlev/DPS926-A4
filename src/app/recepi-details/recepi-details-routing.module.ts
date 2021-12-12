import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepiDetailsPage } from './recepi-details.page';

const routes: Routes = [
  {
    path: '',
    component: RecepiDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepiDetailsPageRoutingModule {}
