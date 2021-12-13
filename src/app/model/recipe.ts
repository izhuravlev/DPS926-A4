import { Ingredient } from './ingredient';

export class Recipe {
  constructor(
    public idMeal: string,
    public strMeal: string,
    public strCategory: string,
    public strArea: string,
    public strInstructions: string,
    public strMealThumb: string,
    public strTags: string,
    public strYoutube: string,
    public strSource: string,
    public ingredients: Ingredient[],
    public ingredientsString?: string,
    public id?: number
  ) {}
}
