import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecepiesService } from 'src/app/services/recepies.service';
import { DbService } from './../services/db.service';
import { Recipe } from 'src/app/model/recipe';
import { Ingredient } from 'src/app/model/ingredient';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recepi-details',
  templateUrl: './recepi-details.page.html',
  styleUrls: ['./recepi-details.page.scss'],
})
export class RecepiDetailsPage implements OnInit {
  Data: any[] = [];
  meal: any;
  recipe: Recipe;
  instructions = [];
  ingredients: Ingredient[] = [];
  mealId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recepiesService: RecepiesService,
    private db: DbService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.recepiesService
      .getMealById(id)
      .subscribe((data) => this.process(data));

    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchRecipes().subscribe((item) => {
          this.Data = item;
        });
      }
    });
  }

  storeData() {
    this.db
      .addRecipe(
        this.recipe.idMeal,
        this.recipe.strMeal,
        this.recipe.strCategory,
        this.recipe.strArea,
        this.recipe.strInstructions,
        this.recipe.strMealThumb,
        this.recipe.strTags,
        this.recipe.strYoutube,
        this.recipe.strSource,
        this.recipe.ingredients
      )
      .then(async (res) => {
        this.mealId = res;
        this.db.fetchRecipes().subscribe((item) => {
          console.log(res);
          this.Data = item;
        });
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Recipe Saved.',
          buttons: ['OK'],
        });
        await alert.present();
      });
  }

  process(data: any) {
    this.meal = data;
    // turn 40 key-value pairs into an array of ingredients
    for (let i = 1; i < 21; i++) {
      let ingrName = 'strIngredient' + i;
      let ingrQuant = 'strMeasure' + i;
      if (Boolean(this.meal[ingrName]) && Boolean(this.meal[ingrQuant])) {
        this.ingredients.push({
          name: this.meal[ingrName],
          strMeasure: this.meal[ingrQuant],
        });
      }
    }
    // split instructions for better view
    let string = this.meal.strInstructions;
    let array = string.split('\r\n');
    this.instructions = array;
    // create recipe object
    this.recipe = new Recipe(
      this.meal.idMeal,
      this.meal.strMeal,
      this.meal.strCategory,
      this.meal.strArea,
      this.meal.strInstructions,
      this.meal.strMealThumb,
      this.meal.strTags,
      this.meal.strYoutube,
      this.meal.strSource,
      this.ingredients
    );
  }

  deleteRecipe() {
    this.db.deleteRecipeById(this.mealId).then(async (res) => {
      this.Data = null;
      this.db.fetchRecipes().subscribe((item) => {
        this.Data = item;
      });

      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Recipe deleted.',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  openWebsite() {
    window.open(this.meal.strYoutube, '_blank'); // opens the link in the new tab.
  }
}
