import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Recipe } from 'src/app/model/recipe';
import { Ingredient } from 'src/app/model/ingredient';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private storage: SQLiteObject;
  recipesList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private sqlPorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      this.createDBAndTables();
    });
  }

  private createDBAndTables() {
    this.sqlite
      .create({
        name: 'recipes_db.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.storage = db;
        this.storage
          .executeSql(
            'CREATE TABLE IF NOT EXISTS RECIPES(id INTEGER PRIMARY KEY AUTOINCREMENT, meal_id TEXT, meal_name TEXT, meal_img TEXT, meal_category TEXT, meal_area TEXT, meal_instructions TEXT, meal_tags TEXT, meal_youtube TEXT, meal_source TEXT, ingredients_String TEXT)',
            []
          )
          .then(() => {
            this.loadRecipes();
            this.isDbReady.next(true);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.recipesList.asObservable();
  }

  // Get list
  loadRecipes() {
    return this.storage
      .executeSql('SELECT * FROM RECIPES', [])
      .then((res) => {
        let recipes: Recipe[] = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            let ingredients: Ingredient[] = JSON.parse(
              res.rows.item(i).ingredients_String
            );
            recipes.push({
              id: res.rows.item(i).id,
              idMeal: res.rows.item(i).meal_id,
              strMeal: res.rows.item(i).meal_name,
              strCategory: res.rows.item(i).meal_category,
              strArea: res.rows.item(i).meal_area,
              strInstructions: res.rows.item(i).meal_instructions,
              strMealThumb: res.rows.item(i).meal_img,
              strTags: res.rows.item(i).meal_tags,
              strYoutube: res.rows.item(i).meal_youtube,
              strSource: res.rows.item(i).meal_source,
              ingredientsString: res.rows.item(i).ingredients_String,
              ingredients: ingredients,
            });
          }
        }
        this.recipesList.next(recipes);
      })
      .catch((e) => console.log(e));
  }

  addRecipe(
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
    strSource,
    ingredients
  ) {
    let data = [
      idMeal,
      strMeal,
      strMealThumb,
      strCategory,
      strArea,
      strInstructions,
      strTags,
      strYoutube,
      strSource,
      JSON.stringify(ingredients),
    ];
    return this.storage
      .executeSql(
        `INSERT INTO RECIPES(meal_id, meal_name, meal_img, meal_category, meal_area, meal_instructions, meal_tags, meal_youtube, meal_source, ingredients_String) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        data
      )
      .then((res) => {
        this.loadRecipes();
        return res.insertId;
      })
      .catch((e) => console.log(e));
  }

  getRecipeById(id: number) {
    return this.storage
      .executeSql(`SELECT * FROM RECIPES WHERE ID=?`, [id])
      .then((res) => {
        let ingredients = JSON.parse(res.rows.item(0).ingredientsString);
        return {
          id: res.rows.item(0).id,
          idMeal: res.rows.item(0).meal_id,
          strMeal: res.rows.item(0).meal_name,
          strCategory: res.rows.item(0).meal_category,
          strArea: res.rows.item(0).meal_area,
          strInstructions: res.rows.item(0).meal_instructions,
          strMealThumb: res.rows.item(0).meal_img,
          strTags: res.rows.item(0).meal_tags,
          strYoutube: res.rows.item(0).meal_youtube,
          strSource: res.rows.item(0).meal_source,
          ingredientsString: res.rows.item(0).ingredients_String,
          ingredients: ingredients,
        };
      })
      .catch((e) => console.log(e));
  }

  deleteRecipeById(id: number) {
    return this.storage
      .executeSql(`DELETE FROM RECIPES WHERE ID=?`, [id])
      .then((res) => {
        this.loadRecipes();
        console.log(res);
      })
      .catch((e) => console.log(e));
  }

  updateRecipe(recipe: Recipe) {
    let data = [
      recipe.idMeal,
      recipe.strMeal,
      recipe.strMealThumb,
      recipe.strCategory,
      recipe.strArea,
      recipe.strInstructions,
      recipe.strTags,
      recipe.strYoutube,
      recipe.strSource,
      JSON.stringify(recipe.ingredients),
      recipe.id,
    ];
    return this.storage
      .executeSql(
        `UPDATE RECIPES SET meal_id=?, meal_name=?, meal_img=?, meal_category=?, meal_area=?, meal_instructions=?, meal_tags=?, meal_youtube=?, meal_source=?, ingredients_String=? WHERE ID=?`,
        data
      )
      .then((res) => {
        this.loadRecipes();
      })
      .catch((e) => console.log(e));
  }
}
