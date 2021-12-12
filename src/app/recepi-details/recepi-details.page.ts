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

  constructor(
    private activatedRoute: ActivatedRoute,
    private recepiesService: RecepiesService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.recepiesService
      .getMealById(id)
      .subscribe((data) => (this.meal = data));

    console.log('Done2!');
  }

  openWebsite() {
    window.open(this.meal.strYoutube, '_blank'); // opens the link in the new tab.
  }
}
