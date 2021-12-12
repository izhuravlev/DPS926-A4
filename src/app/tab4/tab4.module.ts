import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';

import { Tab4PageRoutingModule } from './tab4-routing.module';
import { FavouritesGridComponent } from '../components/favourites-grid/favourites-grid.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, Tab4PageRoutingModule],
  declarations: [Tab4Page, FavouritesGridComponent],
})
export class Tab4PageModule {}
