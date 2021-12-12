import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecepiesService, SearchType } from 'src/app/services/recepies.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  results: Observable<any>;
  meals: Observable<any>;
  categoryWasChosen: Boolean;
  category: string;

  constructor(private recepiesService: RecepiesService) {}

  ngOnInit() {
    this.recepiesService
      .getCategories()
      .subscribe((data) => (this.results = data));
    this.category = '';
    this.categoryWasChosen = false;
  }

  categoryChosen(category: string) {
    this.recepiesService
      .getMeals(category, SearchType.categories)
      .subscribe((data) => (this.meals = data));
    this.categoryWasChosen = true;
    this.category = category;
  }

  getBack() {
    this.meals = undefined;
    this.categoryWasChosen = false;
    this.category = '';
  }
}
