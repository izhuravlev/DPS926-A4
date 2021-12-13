import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { DbService } from 'src/app/services/db.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.scss'],
})
@Injectable({ providedIn: 'any' })
export class RecepiesListComponent implements OnInit {
  @Input() items?: any;
  constructor(
    private db: DbService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  deleteRecipe(id) {
    this.db.deleteRecipeById(id).then(async (res) => {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Recipe deleted.',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }
}
