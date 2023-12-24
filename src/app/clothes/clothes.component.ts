import { Component, OnInit } from '@angular/core';
import { ClothesService } from '../services/clothes.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent {

  cloth: any = {};

  constructor(private getCloth: ClothesService) { }

}
