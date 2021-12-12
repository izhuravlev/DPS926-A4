import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Injectable,
} from '@angular/core';

@Component({
  selector: 'app-favourites-grid',
  templateUrl: './favourites-grid.component.html',
  styleUrls: ['./favourites-grid.component.scss'],
})
@Injectable({ providedIn: 'any' })
export class FavouritesGridComponent implements OnInit {
  @Input() items?: any;

  @Output() chosenCategory = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  categoryChosen(category: string) {
    this.chosenCategory.emit(category);
  }
}
