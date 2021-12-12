import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchType, RecepiesService } from 'src/app/services/recepies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  searchTypes = ['Categories', 'Area', 'Ingredients'];
  isLoading = false;
  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;
  constructor(private recepiesService: RecepiesService) {}

  ngOnInit() {}

  searchChanged() {
    this.isLoading = true;
    this.results = this.recepiesService.getMealByName(this.searchTerm);
    this.isLoading = false;
  }
}
