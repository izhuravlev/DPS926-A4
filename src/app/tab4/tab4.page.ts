import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecepiesService } from 'src/app/services/recepies.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  results: Observable<any>;

  constructor(private recepiesService: RecepiesService) {}

  ngOnInit() {
    this.recepiesService
      .getCategories()
      .subscribe((data) => (this.results = data));
  }
}
