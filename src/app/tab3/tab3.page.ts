import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from './../services/db.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  Data: any[] = [];
  results: any;
  constructor(private db: DbService) {}

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchRecipes().subscribe((item) => {
          this.Data = item;
        });
      }
    });
  }
}
