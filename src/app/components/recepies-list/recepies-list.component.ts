import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.scss'],
})
@Injectable({ providedIn: 'any' })
export class RecepiesListComponent implements OnInit {
  @Input() items?: any;
  constructor() {}

  ngOnInit() {}
}
