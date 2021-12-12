import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
  all = '',
  categories = 'c',
  area = 'a',
  ingredients = 'i',
}
export interface Meals {
  meals: [{}];
}

@Injectable({
  providedIn: 'root',
})
export class RecepiesService {
  url = 'https://www.themealdb.com/';
  apiLink = 'api/json/v1/1/';
  apiKey = '1';

  constructor(private http: HttpClient) {}

  // Get Meal Categories
  getCategories(): Observable<any> {
    return this.http
      .get(`${this.url + this.apiLink}categories.php?&apikey=${this.apiKey}`)
      .pipe(map((data) => data['categories']));
  }

  // Get Meal Ingredients
  getIngredients(): Observable<any> {
    return this.http
      .get(`${this.url + this.apiLink}list.php?i=list&apikey=${this.apiKey}`)
      .pipe(map((data) => data['meals']));
  }

  // Get Meal Areas
  getAreas(): Observable<any> {
    return this.http
      .get(`${this.url + this.apiLink}list.php?a=list&apikey=${this.apiKey}`)
      .pipe(map((data) => data['meals']));
  }

  // Get Meals Filtered
  getMeals(title: string, type: SearchType): Observable<any> {
    return this.http
      .get(
        `${this.url + this.apiLink}filter.php?${type}=${title}&apikey=${
          this.apiKey
        }`
      )
      .pipe(map((data) => data['meals']));
  }

  // Get Random Meal
  getRandomMeal(): Observable<any> {
    return this.http
      .get(`${this.url + this.apiLink}random.php?&apikey=${this.apiKey}`)
      .pipe(map((data) => data['meals'][0]));
  }

  // Get Meal by Name
  getMealByName(title: string): Observable<any> {
    return this.http
      .get(
        `${this.url + this.apiLink}search.php?s=${title}&apikey=${this.apiKey}`
      )
      .pipe(map((data) => data['meals']));
  }

  // Get Meal Details By ID
  getMealById(id: string): Observable<any> {
    return this.http
      .get(`${this.url + this.apiLink}lookup.php?i=${id}&apikey=${this.apiKey}`)
      .pipe(map((data) => data['meals'][0]));
  }
}
