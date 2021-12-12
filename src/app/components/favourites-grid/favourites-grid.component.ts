import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favourites-grid',
  templateUrl: './favourites-grid.component.html',
  styleUrls: ['./favourites-grid.component.scss'],
})
export class FavouritesGridComponent implements OnInit {
  @Input() items?: any;

  constructor() {}

  ngOnInit() {}
}
