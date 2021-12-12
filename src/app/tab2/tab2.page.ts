import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecepiesService } from 'src/app/services/recepies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  results: Observable<any>;

  constructor(private recepiesService: RecepiesService) {}

  ngOnInit() {
    this.results = this.recepiesService.getRandomMeal();
    console.log(this.results);
  }
}
