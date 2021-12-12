import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecepiesService } from 'src/app/services/recepies.service';

@Component({
  selector: 'app-recepi-details',
  templateUrl: './recepi-details.page.html',
  styleUrls: ['./recepi-details.page.scss'],
})
export class RecepiDetailsPage implements OnInit {
  meal: any;
  ingredients = [];
  instructions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private recepiesService: RecepiesService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.recepiesService
      .getMealById(id)
      .subscribe((data) => this.process(data));
  }

  process(data: any) {
    this.meal = data;
    for (let i = 1; i < 21; i++) {
      let ingrName = 'strIngredient' + i;
      let ingrQuant = 'strMeasure' + i;
      if (Boolean(this.meal[ingrName]) && Boolean(this.meal[ingrQuant])) {
        let pair = {};
        pair['key'] = this.meal[ingrName];
        pair['value'] = this.meal[ingrQuant];
        this.ingredients.push(pair);
      }
    }
    let string = this.meal.strInstructions;
    let array = string.split('\r\n');
    this.instructions = array;
  }

  openWebsite() {
    window.open(this.meal.strYoutube, '_blank'); // opens the link in the new tab.
  }
}
